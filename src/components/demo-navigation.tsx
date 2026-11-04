"use client";

import { useEffect, useState, type MouseEvent, type ReactNode } from "react";

export function DemoNavigation({ children }: { children: ReactNode }) {
  const [barHidden, setBarHidden] = useState(false);
  const [formFits, setFormFits] = useState(false);

  useEffect(() => {
    const form = document.getElementById("demo");
    if (!form) return;
    // Reserve the initial header offset too, not only the sticky top offset.
    // Recheck when fonts, validation messages or browser zoom change the height.
    const measure = () => setFormFits(form.getBoundingClientRect().height <= window.innerHeight - 144);
    const observer = new ResizeObserver(measure);
    observer.observe(form);
    window.addEventListener("resize", measure);
    return () => { observer.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  useEffect(() => {
    const form = document.getElementById("demo");
    const footer = document.querySelector(".footer-band");
    if (!form || !footer) return;
    let formVisible = false;
    let footerNear = false;
    const formObserver = new IntersectionObserver(([entry]) => {
      formVisible = entry.isIntersecting;
      setBarHidden(formVisible || footerNear);
    });
    const footerObserver = new IntersectionObserver(([entry]) => {
      footerNear = entry.isIntersecting;
      setBarHidden(formVisible || footerNear);
    }, { rootMargin: "0px 0px 120px 0px" });
    formObserver.observe(form);
    footerObserver.observe(footer);
    return () => { formObserver.disconnect(); footerObserver.disconnect(); };
  }, []);

  function focusDemo(event: MouseEvent<HTMLDivElement>) {
    const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href="#demo"]');
    if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const form = document.getElementById("demo");
    if (!form) return;
    event.preventDefault();
    const scroller = form.closest<HTMLElement>(".lead-sticky");
    const persistent = scroller && window.getComputedStyle(scroller).position === "sticky";
    const bounds = form.getBoundingClientRect();
    if (!persistent || bounds.top < 0 || bounds.top >= window.innerHeight) {
      form.scrollIntoView({ block: "start", behavior: "instant" });
    }
    // Focus a usable field, or the receipt/error region when the form is locked.
    const target = form.querySelector<HTMLElement>('input[name="name"]:not(:disabled)')
      ?? form.querySelector<HTMLElement>('[role="status"]');
    target?.focus({ preventScroll: true });
    target?.scrollIntoView({ block: "nearest", behavior: "instant" });
    if (window.location.hash !== "#demo") window.history.pushState(null, "", "#demo");
  }

  return <div className="landing-page" data-form-fits={formFits} onClick={focusDemo}>
    {children}
    <div className="mobile-demo-bar" hidden={barHidden}>
      <a className="button button-primary" href="#demo">Solicitar demo <span aria-hidden="true">↗</span></a>
    </div>
  </div>;
}
