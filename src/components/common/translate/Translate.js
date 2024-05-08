import React, { useEffect, useRef, useCallback } from "react";

export default function TranslateReact({}) {
  const translateContainer = useRef(null);

  const googleTranslateElementInit = useCallback(() => {
    // const { Maps } = window.google;

    new window.google.translate.TranslateElement(
      {
        pageLanguage: "fa",
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
      },
      "google_translate_element"
    );
  }, []);



  useEffect(() => {
    if (window.google && window.google.translate) {
      googleTranslateElementInit();
    } else {
      var element = document.createElement("div");
      element.setAttribute("id", "google_translate_element");
      document.body.appendChild(element);

      const scriptTag = document.createElement("script");
      scriptTag.setAttribute("type", "text/javascript");
      scriptTag.setAttribute(
        "src",
        `//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit`
      );
      // scriptTag.setAttribute('async', true)
      scriptTag.async = true;
      scriptTag.defer = true;
      document.body.appendChild(scriptTag);
      window.googleTranslateElementInit = googleTranslateElementInit;

    }
  }, []);

  return <div ref={translateContainer} ></div>;
}
