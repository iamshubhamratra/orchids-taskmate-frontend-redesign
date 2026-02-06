"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { FadeIn, GlowButton, StaggerContainer, StaggerItem } from "@/components/animations";
import {
  Users, Plus, Search, Trash2, Edit3, X, Loader2, Key, FileText, AlertTriangle,
  ChevronRight, Hash, Save,
} from "lucide-react";

export default function TeamsPage() {
  const { user } = useAuth();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(null);
  const [showEdit, setShowEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searching, setSearching] = useState(false);
  const [createForm, setCreateForm] = useState({ teamName: "", teamDescription: "" });
  const [editForm, setEditForm] = useState({ teamName: "", teamDescription: "" });
  const [createLoading, setCreateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTeams = async () => {
    try {
      const res = await api.listAdminTeams();
      if (res.ok && res.data?.data) setTeams(res.data.data);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetchTeams(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    setCreateLoading(true);
    try {
      const res = await api.createTeam(createForm);
      if (res.ok) {
        setShowCreate(false);
        setCreateForm({ teamName: "", teamDescription: "" });
        fetchTeams();
      } else {
        setError(res.data?.message || "Failed to create team");
      }
    } catch { setError("Network error"); }
    setCreateLoading(false);
  };

  const handleDelete = async (teamKey) => {
    setDeleteLoading(true);
    try {
      const res = await api.deleteTeam({ teamKey });
      if (res.ok) {
        setShowDelete(null);
        fetchTeams();
      }
    } catch {}
    setDeleteLoading(false);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    setError("");
    try {
      const res = await api.updateTeam({
        teamKey: showEdit.teamKey,
        teamName: editForm.teamName,
        teamDescription: editForm.teamDescription,
      });
      if (res.ok) {
        setShowEdit(null);
        fetchTeams();
      } else {
        setError(res.data?.message || "Failed to update team");
      }
    } catch { setError("Network error"); }
    setEditLoading(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearching(true);
    setSearchResult(null);
    try {
      const res = await api.searchTeam({ teamKey: searchQuery.trim() });
      if (res.ok && res.data?.data) {
        setSearchResult(res.data.data);
      } else {
        setSearchResult("not_found");
      }
    } catch { setSearchResult("not_found"); }
    setSearching(false);
  };

  const openEdit = (team) => {
    setEditForm({ teamName: team.teamName, teamDescription: team.teamDescription || "" });
    setShowEdit(team);
    setError("");
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Header */}
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Teams</h1>
            <p className="text-sm text-zinc-400 mt-1">Create and manage your teams</p>
          </div>
          <GlowButton
            onClick={() => { setShowCreate(true); setError(""); }}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white"
          >
            <Plus className="h-4 w-4" /> New Team
          </GlowButton>
        </div>
      </FadeIn>

      {/* Search */}
      <FadeIn delay={0.1}>
        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by team key..."
              className="w-full rounded-xl border border-white/10 bg-white/5 pl-11 pr-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          <GlowButton
            type="submit"
            disabled={searching}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-zinc-300 hover:bg-white/10 hover:text-white transition-all"
          >
            {searching ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
          </GlowButton>
        </form>
      </FadeIn>

      {/* Search Result */}
      <AnimatePresence>
        {searchResult && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {searchResult === "not_found" ? (
              <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 text-sm text-yellow-400">
                No team found with that key.
              </div>
            ) : (
              <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6">
                <div className="flex items-center gap-2 text-xs text-indigo-400 mb-3">
                  <Search className="h-3 w-3" /> Search Result
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-lg font-bold text-indigo-300">
                    {searchResult.teamName?.[0]?.toUpperCase() || "T"}
                  </div>
                  <div>
                    <div className="text-base font-semibold text-white">{searchResult.teamName}</div>
                    <div className="text-sm text-zinc-400">{searchResult.teamDescription || "No description"}</div>
                    <div className="mt-1 text-xs font-mono text-zinc-500">{searchResult.teamKey}</div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Teams List - Vertical */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl bg-white/5" />
          ))}
        </div>
      ) : teams.length === 0 ? (
        <FadeIn delay={0.2}>
          <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-white/5 bg-white/[0.02]">
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Users className="h-16 w-16 text-zinc-700 mb-6" />
            </motion.div>
            <h3 className="text-lg font-semibold text-white">No teams yet</h3>
            <p className="text-sm text-zinc-400 mt-2 max-w-sm">Create your first team to start collaborating with others.</p>
            <GlowButton
              onClick={() => setShowCreate(true)}
              className="mt-6 flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white"
            >
              <Plus className="h-4 w-4" /> Create First Team
            </GlowButton>
          </div>
        </FadeIn>
      ) : (
        <StaggerContainer className="space-y-4" staggerDelay={0.08}>
          {teams.map((team, i) => (
            <StaggerItem key={team._id || i}>
              <motion.div
                whileHover={{ borderColor: "rgba(99,102,241,0.2)", y: -2 }}
                className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-all"
              >
                <div className="flex items-start gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-xl font-bold text-indigo-300">
                    {team.teamName?.[0]?.toUpperCase() || "T"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-lg font-semibold text-white">{team.teamName}</h3>
                    </div>
                    <p className="text-sm text-zinc-400 mt-1">{team.teamDescription || "No description"}</p>
                    <div className="flex items-center gap-4 mt-3 flex-wrap">
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                        <Key className="h-3 w-3" />
                        <span className="font-mono">{team.teamKey}</span>
                      </div>
                      {team.createdAt && (
                        <div className="text-xs text-zinc-600">
                          Created {new Date(team.createdAt).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => openEdit(team)}
                      className="rounded-xl p-2.5 text-zinc-400 hover:bg-white/10 hover:text-white transition-all"
                    >
                      <Edit3 className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowDelete(team)}
                      className="rounded-xl p-2.5 text-zinc-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}

      {/* Create Team Modal */}
      <AnimatePresence>
        {showCreate && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowCreate(false)} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Create Team</h3>
                <button onClick={() => setShowCreate(false)} className="text-zinc-400 hover:text-white transition-colors"><X className="h-5 w-5" /></button>
              </div>
              {error && <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>}
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Team Name</label>
                  <input value={createForm.teamName} onChange={(e) => setCreateForm({ ...createForm, teamName: e.target.value })} required placeholder="e.g. Engineering" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Description</label>
                  <textarea value={createForm.teamDescription} onChange={(e) => setCreateForm({ ...createForm, teamDescription: e.target.value })} rows={3} placeholder="What does this team do?" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 resize-none" />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowCreate(false)} className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-sm text-zinc-400 hover:text-white transition-colors">Cancel</button>
                  <GlowButton type="submit" disabled={createLoading} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3 text-sm font-semibold text-white disabled:opacity-50">
                    {createLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Team"}
                  </GlowButton>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Edit Team Modal */}
      <AnimatePresence>
        {showEdit && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowEdit(null)} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Edit Team</h3>
                <button onClick={() => setShowEdit(null)} className="text-zinc-400 hover:text-white transition-colors"><X className="h-5 w-5" /></button>
              </div>
              {error && <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>}
              <form onSubmit={handleEdit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Team Name</label>
                  <input value={editForm.teamName} onChange={(e) => setEditForm({ ...editForm, teamName: e.target.value })} required className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Description</label>
                  <textarea value={editForm.teamDescription} onChange={(e) => setEditForm({ ...editForm, teamDescription: e.target.value })} rows={3} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 resize-none" />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowEdit(null)} className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-sm text-zinc-400 hover:text-white transition-colors">Cancel</button>
                  <GlowButton type="submit" disabled={editLoading} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3 text-sm font-semibold text-white disabled:opacity-50">
                    {editLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Save className="h-4 w-4" /> Update</>}
                  </GlowButton>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDelete && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowDelete(null)} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl"
            >
              <div className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 mb-4">
                  <AlertTriangle className="h-7 w-7 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Delete Team</h3>
                <p className="text-sm text-zinc-400 mt-2">
                  Are you sure you want to delete <strong className="text-white">{showDelete.teamName}</strong>? This action cannot be undone.
                </p>
                <div className="flex gap-3 mt-6 w-full">
                  <button onClick={() => setShowDelete(null)} className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-sm text-zinc-400 hover:text-white transition-colors">Cancel</button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDelete(showDelete.teamKey)}
                    disabled={deleteLoading}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-red-500/20 border border-red-500/30 py-3 text-sm font-semibold text-red-400 hover:bg-red-500/30 transition-all disabled:opacity-50"
                  >
                    {deleteLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Delete"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
