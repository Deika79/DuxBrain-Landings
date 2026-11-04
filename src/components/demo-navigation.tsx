"use client";

import { useEffect, useState, type MouseEvent, type ReactNode } from "react";

export function DemoNavigation({ children }: { children: ReactNode }) {
  const [barHidden, setBarHidden] = useState(false);

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
    const desktop = window.matchMedia("(min-width: 1100px)").matches;
    const scroller = form.closest<HTMLElement>(".lead-sticky");
    if (scroller) scroller.scrollTop = 0;
    const bounds = form.getBoundingClientRect();
    if (!desktop || bounds.top < 0 || bounds.top >= window.innerHeight) {
      form.scrollIntoView({ block: "start", behavior: "instant" });
    }
    // Focus a usable field, or the receipt/error region when the form is locked.
    const target = form.querySelector<HTMLElement>('input[name="name"]:not(:disabled)')
      ?? form.querySelector<HTMLElement>('[role="status"]');
    target?.focus({ preventScroll: true });
    target?.scrollIntoView({ block: "nearest", behavior: "instant" });
    if (window.location.hash !== "#demo") window.history.pushState(null, "", "#demo");
  }

  return <div className="landing-page" onClick={focusDemo}>
    {children}
    <div className="mobile-demo-bar" hidden={barHidden}>
      <a className="button button-primary" href="#demo">Solicitar demo <span aria-hidden="true">↗</span></a>
    </div>
  </div>;
}
