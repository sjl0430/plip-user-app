function copyWithTextarea(value: string): boolean {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.cssText = "position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  textarea.setSelectionRange(0, value.length);
  const ok = document.execCommand("copy");
  document.body.removeChild(textarea);
  return ok;
}

/** HTTPS/localhost는 Clipboard API, 그 외(사설 IP HTTP 등)는 textarea 폴백. */
export async function copyText(value: string): Promise<boolean> {
  if (!value) return false;

  const canUseClipboard = window.isSecureContext && !!navigator.clipboard?.writeText;
  if (canUseClipboard) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      /* fall through */
    }
  }

  return copyWithTextarea(value);
}
