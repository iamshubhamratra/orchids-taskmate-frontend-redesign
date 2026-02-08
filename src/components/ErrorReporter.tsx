"use client";

import { useEffect, useRef } from "react";

type ReporterProps = {
  error?: Error & { digest?: string };
  reset?: () => void;
};

export default function ErrorReporter({ error }: ReporterProps) {
  const lastOverlayMsg = useRef("");
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let inIframe = false;

    try {
      inIframe = window.parent !== window;
    } catch {
      inIframe = false;
    }

    if (!inIframe) return;

    const send = (payload: unknown) =>
      window.parent.postMessage(payload, "*");

    const onError = (e: ErrorEvent) =>
      send({
        type: "ERROR_CAPTURED",
        error: {
          message: e.message,
          stack: e.error?.stack,
          filename: e.filename,
          lineno: e.lineno,
          colno: e.colno,
          source: "window.onerror",
        },
        timestamp: Date.now(),
      });

    const onReject = (e: PromiseRejectionEvent) =>
      send({
        type: "ERROR_CAPTURED",
        error: {
          message: e.reason?.message ?? String(e.reason),
          stack: e.reason?.stack,
          source: "unhandledrejection",
        },
        timestamp: Date.now(),
      });

    const pollOverlay = () => {
      const overlay = document.querySelector(
        "[data-nextjs-dialog-overlay]"
      );
      const node =
        overlay?.querySelector(
          "h1, h2, .error-message, [data-nextjs-dialog-body]"
        ) ?? null;

      const text = node?.textContent?.trim();
      if (text && text !== lastOverlayMsg.current) {
        lastOverlayMsg.current = text;
        send({
          type: "ERROR_CAPTURED",
          error: {
            message: text,
            source: "nextjs-dev-overlay",
          },
          timestamp: Date.now(),
        });
      }
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onReject);
    pollRef.current = setInterval(pollOverlay, 1000);

    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onReject);
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  useEffect(() => {
    if (!error) return;

    window.parent?.postMessage(
      {
        type: "GLOBAL_ERROR",
        error: {
          message: error.message,
          stack: error.stack,
          digest: error.digest,
          name: error.name,
        },
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
      },
      "*"
    );
  }, [error]);

  if (!error) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-2xl font-bold text-destructive">
          Something went wrong!
        </h1>
        <p className="text-muted-foreground">
          An unexpected error occurred.
        </p>
      </div>
    </div>
  );
}
