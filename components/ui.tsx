import { HTMLAttributes, InputHTMLAttributes, ButtonHTMLAttributes } from "react";

export function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`rounded-3xl bg-white shadow-sm ${className}`} {...props} />;
}

export function CardTitle({ className = "", ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={`text-2xl font-semibold ${className}`} {...props} />;
}

export function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none ring-0 focus:border-slate-500 ${className}`} {...props} />;
}

export function Button({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`rounded-2xl bg-slate-900 px-4 py-3 font-medium text-white disabled:opacity-50 ${className}`} {...props} />;
}
