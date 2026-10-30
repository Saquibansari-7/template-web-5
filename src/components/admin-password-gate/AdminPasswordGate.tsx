import { useState, type FormEvent, type ReactNode } from "react";
import GoldDivider from "../GoldDivider";
import styles from "./admin-password-gate.module.css";

const MASTER_VERIFY_URL =
  "https://weddappvows.vercel.app/api/admin/config";

interface AdminPasswordGateProps {
  customer: string;
  children: ReactNode;
}

function readStoredPassword(storageKey: string): string | null {
  return window.localStorage.getItem(storageKey);
}

function hashPassword(password: string): Promise<string> {
  if (!window.crypto?.subtle) {
    throw new Error("Secure password storage is unavailable in this browser.");
  }

  return window.crypto.subtle
    .digest("SHA-256", new TextEncoder().encode(password))
    .then((buffer) => {
      const digest = Array.from(new Uint8Array(buffer))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
      return `sha256:${digest}`;
    });
}

async function verifyMasterPassword(
  customer: string,
  password: string,
): Promise<boolean> {
  const response = await fetch(
    `${MASTER_VERIFY_URL}?customer=${encodeURIComponent(customer)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    },
  );

  if (!response.ok) {
    throw new Error("Backup password verification is unavailable.");
  }

  const result = await response.json();
  if (typeof result?.valid !== "boolean") {
    throw new Error("The backup password service returned an invalid response.");
  }

  return result.valid;
}

export default function AdminPasswordGate({
  customer,
  children,
}: AdminPasswordGateProps) {
  const storageKey = `admin_pass_${customer}`;
  const [step, setStep] = useState(() => {
    if (!customer) return "error";
    try {
      return readStoredPassword(storageKey) ? "enter" : "set";
    } catch {
      return "error";
    }
  });
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(() => {
    if (!customer) {
      return "Missing customer parameter. Open the admin page with ?customer=subdomain.";
    }
    try {
      readStoredPassword(storageKey);
      return "";
    } catch {
      return "Browser storage is unavailable. Enable local storage to use the admin panel.";
    }
  });
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  async function savePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const hashedPassword = await hashPassword(password);
      window.localStorage.setItem(storageKey, hashedPassword);
      setPassword("");
      setConfirm("");
      setStep("authenticated");
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Could not save the admin password.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function verifyPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!password || loading) return;
    setLoading(true);
    setError("");

    try {
      const storedPassword = readStoredPassword(storageKey);
      const hashedPassword = await hashPassword(password);

      if (storedPassword === hashedPassword || storedPassword === password) {
        if (storedPassword === password) {
          window.localStorage.setItem(storageKey, hashedPassword);
        }
        setPassword("");
        setStep("authenticated");
        return;
      }

      if (await verifyMasterPassword(customer, password)) {
        setPassword("");
        setStep("authenticated");
      } else {
        setError("Incorrect password.");
      }
    } catch (verificationError) {
      setError(
        verificationError instanceof Error
          ? verificationError.message
          : "Could not verify the password.",
      );
    } finally {
      setLoading(false);
    }
  }

  function lockAdmin() {
    setPassword("");
    setError("");
    setStep("enter");
  }

  function changePassword() {
    setError("");
    setPassword("");
    setConfirm("");

    try {
      window.localStorage.removeItem(storageKey);
      setStep("set");
    } catch {
      setError("Could not remove the saved password. Check browser storage settings.");
    }
  }

  if (step === "error") {
    return (
      <div className={styles.gate}>
        <p className={styles.error}>{error}</p>
      </div>
    );
  }

  if (step === "authenticated") {
    return (
      <>
        <div className={styles.adminActions}>
          <button type="button" onClick={changePassword}>
            Change admin password
          </button>
          <button type="button" onClick={lockAdmin}>
            Lock admin
          </button>
        </div>
        {error && <p className={styles.actionError}>{error}</p>}
        {children}
      </>
    );
  }

  if (step === "check") {
    return <div className={styles.gate} aria-busy="true" />;
  }

  return (
    <div className={styles.gate}>
      <div className={styles.card}>
        <h1 className={styles.title}>Admin Access</h1>
        <GoldDivider className={styles.divider} />

        {step === "set" ? (
          <form onSubmit={savePassword}>
            <p className={styles.sub}>
              Set a password for this admin panel. You will need it on future
              visits. This browser-side gate does not replace server-side
              authorization for protected data or APIs.
            </p>
            <input
              type={showPwd ? "text" : "password"}
              placeholder="New password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              minLength={8}
              required
            />
            <input
              type={showPwd ? "text" : "password"}
              placeholder="Confirm password"
              value={confirm}
              onChange={(event) => setConfirm(event.target.value)}
              autoComplete="new-password"
              minLength={8}
              required
            />
            <label className={styles.showPassword}>
              <input
                type="checkbox"
                checked={showPwd}
                onChange={(event) => setShowPwd(event.target.checked)}
              />
              Show password
            </label>
            <button type="submit" className={styles.primaryBtn} disabled={loading}>
              {loading ? "Saving…" : "Set Password"}
            </button>
          </form>
        ) : (
          <form onSubmit={verifyPassword}>
            <p className={styles.sub}>
              Enter your admin password. The support backup password is also
              checked by the server.
            </p>
            <input
              type={showPwd ? "text" : "password"}
              placeholder="Enter admin password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
              autoFocus
            />
            <label className={styles.showPassword}>
              <input
                type="checkbox"
                checked={showPwd}
                onChange={(event) => setShowPwd(event.target.checked)}
              />
              Show password
            </label>
            <button type="submit" className={styles.primaryBtn} disabled={loading}>
              {loading ? "Checking…" : "Sign In"}
            </button>
          </form>
        )}

        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
}
