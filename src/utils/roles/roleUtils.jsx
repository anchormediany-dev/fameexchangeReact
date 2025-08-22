// roles/roleUtils.js
import React, { useMemo } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { Navigate } from "react-router-dom";

/* ----------------------- Role constants ----------------------- */
export const Roles = Object.freeze({
  FAN: "FAN",
  TALENT: "TALENT",
  ADMIN: "ADMIN",
});

/* ----------------------- Store selector ----------------------- */
/** Adjust this once to match your Redux shape */
export function selectUserFromStore(state) {
  // Try common locations to be resilient
  return (
    state?.auth?.profile?.user ??
    state?.auth?.profile ??
    state?.auth?.user ??
    null
  );
}

/* ----------------------- Normalizers & checks ----------------------- */
export function normalizeRole(user) {
  if (!user) return undefined;
  if (user.isAdmin) return Roles.ADMIN; // legacy/admin flag wins
  const r = String(user.role || "").toUpperCase();
  return [Roles.ADMIN, Roles.TALENT, Roles.FAN].includes(r) ? r : undefined;
}

export const isLoggedIn = (u) => Boolean(u?.id || u?._id);
export const isKycVerified = (u) => Boolean(u?.KYC_Verified);

export const isAdmin = (u) => normalizeRole(u) === Roles.ADMIN;
export const isTalent = (u) => normalizeRole(u) === Roles.TALENT;
export const isFan = (u) => normalizeRole(u) === Roles.FAN;

export function hasAnyRole(user, roles = []) {
  const me = normalizeRole(user);
  if (!me) return false;
  const set = new Set(roles.map((r) => String(r).toUpperCase()));
  return set.has(me);
}

export function hasAllRoles(user, roles = []) {
  // Single-role users rarely satisfy "all"; provided for completeness
  const me = normalizeRole(user);
  return roles.every((r) => String(r).toUpperCase() === me);
}

/* ----------------------- Hook for components ----------------------- */
export function useRole(userOverride) {
  const storeUser = useSelector(selectUserFromStore, shallowEqual);
  // Prefer override when explicitly passed
  const user = userOverride ?? storeUser;

  // Memoize derived flags so dependents don't re-render unnecessarily
  return useMemo(() => {
    const role = normalizeRole(user);
    return {
      user,
      role,
      isAdmin: role === Roles.ADMIN,
      isTalent: role === Roles.TALENT,
      isFan: role === Roles.FAN,
      loggedIn: isLoggedIn(user),
      kyc: isKycVerified(user),
      hasAny: (roles) => hasAnyRole(user, roles),
      hasAll: (roles) => hasAllRoles(user, roles),
    };
  }, [user?.id, user?._id, user?.role, user?.isAdmin, user?.KYC_Verified]);
}

/* ----------------------- Display gates (JSX) ----------------------- */
export function ShowFor({ anyOf = [], user, elseRender = null, children }) {
  const { hasAny } = useRole(user);
  return hasAny(anyOf) ? <>{children}</> : <>{elseRender}</>;
}

export function HideFor({ anyOf = [], user, children }) {
  const { hasAny } = useRole(user);
  return hasAny(anyOf) ? null : <>{children}</>;
}

/* Shorthands */
export const AdminOnly = (p) => <ShowFor anyOf={[Roles.ADMIN]} {...p} />;
export const TalentOnly = (p) => <ShowFor anyOf={[Roles.TALENT]} {...p} />;
export const FanOnly = (p) => <ShowFor anyOf={[Roles.FAN]} {...p} />;
export const AdminOrTalentOnly = (p) => (
  <ShowFor anyOf={[Roles.ADMIN, Roles.TALENT]} {...p} />
);
export const AnyUser = (p) => (
  <ShowFor anyOf={[Roles.ADMIN, Roles.FAN, Roles.TALENT]} {...p} />
);

/* ----------------------- Route guard (React Router v6) ----------------------- */
export function RequireRole({ anyOf = [], redirect = "/403", user, children }) {
  const { loggedIn, hasAny } = useRole(user);
  if (!loggedIn) return <Navigate to="/login" replace />;
  if (!hasAny(anyOf)) return <Navigate to={redirect} replace />;
  return children;
}

/* ----------------------- HOC (optional) ----------------------- */
export const withRole = (Component) => (props) => {
  const access = useRole();
  return <Component {...props} access={access} />;
};
