export function getLegalDoc(kind, lang) {
  const it = lang === "it";
  if (kind === "privacy") {
    return it
      ? {
          title: "Informativa sulla privacy",
          updated: "7 settembre 2026",
          sections: [
            {
              heading: "Titolare",
              body: [
                "Questa informativa si applica a nduja.games, sito di ’ndujaGames.",
                "Contatto: ndujagames@sameteam.co",
                "Ogni gioco (Chromawell, ABdoku, ChessRelay, Midcoil, Hexact) ha anche una propria informativa, nelle Impostazioni del gioco.",
              ],
            },
            {
              heading: "Dati raccolti",
              body: [
                "Il sito non richiede nome, email o telefono.",
                "Il server può registrare log tecnici (indirizzo IP, user agent, orario) per sicurezza e funzionamento.",
                "Tema e lingua restano sul dispositivo (localStorage).",
              ],
            },
            {
              heading: "Cookie e statistiche",
              body: [
                "Se accetti, usiamo Google Analytics 4 (Google Ireland Ltd. e Google LLC) per misurare le visite al sito. Non usiamo questi dati per pubblicità.",
                "Google può impostare cookie di misurazione (ad esempio _ga) e trattare dati del dispositivo e indirizzo IP. I dati possono essere trasferiti negli Stati Uniti.",
                "In Europa chiediamo il consenso prima di attivare Analytics (base giuridica: consenso, art. 6.1.a GDPR). Puoi rifiutare o cambiare scelta dal link Cookie in fondo alle pagine. Il sito funziona comunque.",
              ],
            },
            {
              heading: "Diritti",
              body: [
                "In base alla normativa applicabile, puoi avere diritto di accesso, rettifica o cancellazione. Scrivici all’indirizzo sopra.",
              ],
            },
          ],
        }
      : {
          title: "Privacy policy",
          updated: "September 7, 2026",
          sections: [
            {
              heading: "Who we are",
              body: [
                "This policy applies to nduja.games, the ’ndujaGames site.",
                "Contact: ndujagames@sameteam.co",
                "Each game (Chromawell, ABdoku, ChessRelay, Midcoil, Hexact) also has its own policy, in the game Settings.",
              ],
            },
            {
              heading: "What we collect",
              body: [
                "The site does not require your name, email, or phone number.",
                "The server may keep technical logs (IP address, user agent, time) for security and operation.",
                "Theme and language stay on your device (localStorage).",
              ],
            },
            {
              heading: "Cookies and analytics",
              body: [
                "If you accept, we use Google Analytics 4 (Google Ireland Ltd. and Google LLC) to measure visits to the site. We do not use this data for advertising.",
                "Google may set measurement cookies (for example _ga) and process device data and IP address. Data may be transferred to the United States.",
                "In Europe we ask for consent before enabling Analytics (legal basis: consent, GDPR art. 6.1.a). You can refuse or change your choice from the Cookie link in the footer. The site still works if you refuse.",
              ],
            },
            {
              heading: "Your rights",
              body: [
                "Depending on your location, you may have rights to access, correct, or delete personal data we hold. Contact us at the address above.",
              ],
            },
          ],
        };
  }
  return it
    ? {
        title: "Termini di servizio",
        updated: "7 settembre 2026",
        sections: [
          {
            heading: "Accordo",
            body: ["Usando nduja.games accetti questi Termini. Se non sei d’accordo, non usare il sito."],
          },
          {
            heading: "Servizio",
            body: [
              "nduja.games è il sito di ’ndujaGames. I giochi collegati sono servizi separati, ciascuno con i propri termini.",
            ],
          },
          {
            heading: "Cookie",
            body: [
              "Possiamo usare cookie di misurazione (Google Analytics) solo con il tuo consenso, come descritto nell’informativa sulla privacy.",
            ],
          },
          {
            heading: "Esclusione garanzie",
            body: ["Il sito è fornito «così com’è»."],
          },
          {
            heading: "Contatti",
            body: ["Domande: ndujagames@sameteam.co"],
          },
        ],
      }
    : {
        title: "Terms of service",
        updated: "September 7, 2026",
        sections: [
          {
            heading: "Agreement",
            body: ["By using nduja.games, you agree to these Terms. If you do not agree, do not use the site."],
          },
          {
            heading: "Service",
            body: [
              "nduja.games is the ’ndujaGames site. Linked games are separate services, each with its own terms.",
            ],
          },
          {
            heading: "Cookies",
            body: [
              "We may use measurement cookies (Google Analytics) only with your consent, as described in the privacy policy.",
            ],
          },
          {
            heading: "Disclaimer",
            body: ["The site is provided “as is”."],
          },
          {
            heading: "Contact",
            body: ["Questions: ndujagames@sameteam.co"],
          },
        ],
      };
}
