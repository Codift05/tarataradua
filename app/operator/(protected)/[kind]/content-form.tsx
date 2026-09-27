"use client";

import { useActionState } from "react";
import { getContentType } from "@/lib/content";
import { deleteContent, saveContent, type ContentFormState } from "./actions";

type Values = Record<string, string | number | boolean | null>;

const initialState: ContentFormState = null;

export default function ContentForm({ kind, id, values }: { kind: string; id?: number; values: Values }) {
  const type = getContentType(kind)!;
  const [state, action, pending] = useActionState(saveContent, initialState);

  return (
    <div className="operator-panel operator-content-panel">
      <form action={action} className="operator-content-form" noValidate>
        <input type="hidden" name="kind" value={kind} />
        {id && <input type="hidden" name="id" value={id} />}
        {type.fields.map((field) => {
          const error = state?.errors[field.name];
          const value = values[field.name];
          const common = {
            id: field.name,
            name: field.name,
            "aria-invalid": error ? true : undefined,
            "aria-describedby": error || field.hint ? `${field.name}-note` : undefined,
          };

          return (
            <div className={`operator-field${field.type === "checkbox" ? " operator-check" : ""}${field.type === "textarea" ? " full" : ""}`} key={field.name}>
              {field.type === "checkbox" ? (
                <label><input type="checkbox" {...common} defaultChecked={Boolean(value)} /> {field.label}</label>
              ) : (
                <>
                  <label htmlFor={field.name}>{field.label}{field.required && <span aria-hidden="true"> *</span>}</label>
                  {field.type === "textarea" ? (
                    <textarea {...common} rows={field.rows} maxLength={field.max} required={field.required} defaultValue={String(value ?? "")} />
                  ) : field.type === "select" ? (
                    <select {...common} required={field.required} defaultValue={String(value ?? field.options?.[0] ?? "")}>
                      {field.options?.map((option) => <option key={option}>{option}</option>)}
                    </select>
                  ) : (
                    <input {...common} type={field.type} maxLength={field.max} min={field.type === "number" ? field.min : undefined} max={field.type === "number" ? field.max : undefined} required={field.required} defaultValue={String(value ?? "")} />
                  )}
                </>
              )}
              {(error || field.hint) && <small id={`${field.name}-note`} className={error ? "operator-field-error" : ""}>{error || field.hint}</small>}
            </div>
          );
        })}
        {state?.message && <p className="operator-error full" role="alert">{state.message}</p>}
        <div className="operator-form-actions full">
          <button className="operator-primary-button" type="submit" disabled={pending}>{pending ? "Menyimpan…" : "Simpan"}</button>
        </div>
      </form>
      {id && (
        <form action={deleteContent} className="operator-delete-form" onSubmit={(event) => { if (!confirm(`Hapus ${type.singular} ini secara permanen?`)) event.preventDefault(); }}>
          <input type="hidden" name="kind" value={kind} />
          <input type="hidden" name="id" value={id} />
          <button type="submit">Hapus {type.singular}</button>
        </form>
      )}
    </div>
  );
}
