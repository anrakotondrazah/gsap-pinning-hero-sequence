import ArrowButton from "@/components/ArrowButton";

export default function Footer() {
  return (
    <footer id="contact" className="bg-ink px-6 py-24 text-paper">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-10 md:flex-row md:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-paper/50">Parlons de votre projet</p>
          <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-tight md:text-5xl">
            Prêt à externaliser vos métiers clés ?
          </h2>
        </div>
        <ArrowButton href="mailto:contact@spm.example" variant="light">
          Demander un devis en 3 h
        </ArrowButton>
      </div>
      <p className="mx-auto mt-20 max-w-6xl border-t border-paper/10 pt-6 text-xs text-paper/40">
        © {new Date().getFullYear()} SPM — Human & AI. Tous droits réservés.
      </p>
    </footer>
  );
}
