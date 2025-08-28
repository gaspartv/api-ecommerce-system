import { NextFunction, Request, Response } from "express";

export function ValidateSubdomainMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const host = req.headers.host || "";
  const allowedHostsEnv = process.env.ALLOWED_API_HOST || "";
  const allowedHosts = allowedHostsEnv
    .split(",")
    .map((h) => h.trim())
    .filter(Boolean);
  if (allowedHosts.includes(host)) {
    return next();
  }
  return res.status(403).json({ message: "Acesso não autorizado." });
}
