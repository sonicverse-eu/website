export function SiteBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.1),transparent_34%),radial-gradient(circle_at_18%_22%,rgba(8,145,178,0.08),transparent_28%),radial-gradient(circle_at_85%_18%,rgba(56,189,248,0.08),transparent_30%)] dark:bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.15),transparent_34%),radial-gradient(circle_at_18%_22%,rgba(45,212,191,0.1),transparent_30%),radial-gradient(circle_at_85%_18%,rgba(96,165,250,0.12),transparent_32%)]" />
      <div className="site-grid absolute inset-0 opacity-[0.34] dark:opacity-[0.18]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background via-background/76 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-background via-background/88 to-transparent" />
    </div>
  )
}
