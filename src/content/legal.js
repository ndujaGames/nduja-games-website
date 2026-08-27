import { config, brandName } from "../config.js";

const CONTACT = config.contactEmail;
const OPERATOR = brandName();

function gamePrivacy(name, lang) {
  if (lang === "it") {
    return {
      title: `Informativa sulla privacy — ${name}`,
      updated: "26 agosto 2026",
      sections: [
        {
          heading: "Titolare",
          body: [
            `Questa informativa si applica a ${name}, prodotto di ${OPERATOR}.`,
            `Contatto: ${CONTACT}`,
          ],
        },
        {
          heading: "Dati raccolti",
          body: [
            "In modalità offline, i progressi di gioco restano sul dispositivo.",
            "Se usi funzioni online nell’app (es. classifiche), possiamo memorizzare un nickname pseudonimo, una chiave pubblica crittografica, punteggi e timestamp. Non richiediamo nome reale, email o telefono.",
            "Possiamo registrare log di server standard (IP, user agent, orario) per sicurezza e prevenzione abusi.",
          ],
        },
        {
          heading: "Finalità e conservazione",
          body: [
            "I dati servono a erogare il gioco e le funzioni online che scegli di usare.",
            "Puoi chiedere la cancellazione di nickname e punteggi associati scrivendoci.",
          ],
        },
        {
          heading: "Diritti",
          body: [
            "In base alla normativa applicabile, puoi avere diritto di accesso, rettifica o cancellazione. Scrivici all’indirizzo sopra.",
          ],
        },
      ],
    };
  }
  return {
    title: `Privacy Policy — ${name}`,
    updated: "August 26, 2026",
    sections: [
      {
        heading: "Who we are",
        body: [
          `This policy applies to ${name}, a product of ${OPERATOR}.`,
          `Contact: ${CONTACT}`,
        ],
      },
      {
        heading: "What we collect",
        body: [
          "When you play offline, your game progress stays on your device.",
          "If you use online features in the app (such as leaderboards), we may store a pseudonymous nickname, a public cryptographic key, scores, and timestamps. We do not require your real name, email, or phone number.",
          "We may collect standard server logs (IP address, user agent, request time) for security and abuse prevention.",
        ],
      },
      {
        heading: "Purpose and retention",
        body: [
          "We use this data to operate the game and the online features you opt into.",
          "You may request deletion of your nickname and associated scores by contacting us.",
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

function gameTerms(name, lang) {
  if (lang === "it") {
    return {
      title: `Termini di servizio — ${name}`,
      updated: "26 agosto 2026",
      sections: [
        {
          heading: "Accordo",
          body: [
            `Usando ${name} accetti questi Termini. Se non sei d’accordo, non usare il gioco.`,
          ],
        },
        {
          heading: "Servizio",
          body: [
            `${name} funziona offline per impostazione predefinita. Funzioni online come le classifiche sono opzionali e disponibili solo nelle app native supportate.`,
          ],
        },
        {
          heading: "Identità pseudonima",
          body: [
            "Alcune funzioni usano un nickname e chiavi crittografiche generate sul dispositivo. Sei responsabile della chiave privata.",
            "I nickname devono essere unici, leciti e non offensivi. Possiamo rimuovere nickname o punteggi a nostra discrezione.",
          ],
        },
        {
          heading: "Uso consentito",
          body: [
            "Non barare, abusare di automazioni o interferire con altri giocatori.",
          ],
        },
        {
          heading: "Esclusione garanzie",
          body: [
            "Il gioco è fornito “così com’è”. Non garantiamo disponibilità continua delle funzioni online.",
          ],
        },
        {
          heading: "Contatti",
          body: [`Domande: ${CONTACT}`],
        },
      ],
    };
  }
  return {
    title: `Terms of Service — ${name}`,
    updated: "August 26, 2026",
    sections: [
      {
        heading: "Agreement",
        body: [
          `By using ${name}, you agree to these Terms. If you do not agree, do not use the game.`,
        ],
      },
      {
        heading: "Service",
        body: [
          `${name} works offline by default. Online features such as leaderboards are optional and available only in supported native apps.`,
        ],
      },
      {
        heading: "Pseudonymous identity",
        body: [
          "Some features use a nickname and cryptographic keys generated on your device. You are responsible for safeguarding your private key.",
          "Nicknames must be unique, lawful, and not offensive. We may remove nicknames or scores at our discretion.",
        ],
      },
      {
        heading: "Acceptable use",
        body: [
          "Do not cheat, automate abuse, or interfere with other players.",
        ],
      },
      {
        heading: "Disclaimer",
        body: [
          "The game is provided “as is”. We do not guarantee uninterrupted availability of online features.",
        ],
      },
      {
        heading: "Contact",
        body: [`Questions: ${CONTACT}`],
      },
    ],
  };
}

/** @type {Record<string, { name: string, privacy: Record<string, object>, terms: Record<string, object> }>} */
export const legalByProject = {
  abdoku: {
    name: "ABdoku",
    privacy: {
      en: gamePrivacy("ABdoku", "en"),
      it: gamePrivacy("ABdoku", "it"),
    },
    terms: {
      en: gameTerms("ABdoku", "en"),
      it: gameTerms("ABdoku", "it"),
    },
  },
  chromawell: {
    name: "Chromawell",
    privacy: {
      en: gamePrivacy("Chromawell", "en"),
      it: gamePrivacy("Chromawell", "it"),
    },
    terms: {
      en: gameTerms("Chromawell", "en"),
      it: gameTerms("Chromawell", "it"),
    },
  },
};

export const legalKinds = ["privacy", "terms"];

export function getLegalDoc(projectId, kind, lang) {
  const project = legalByProject[projectId];
  if (!project || !legalKinds.includes(kind)) return null;
  const locale = lang === "it" ? "it" : "en";
  return project[kind]?.[locale] ?? null;
}

export function legalCatalog() {
  return Object.entries(legalByProject).map(([id, project]) => ({
    id,
    name: project.name,
    docs: legalKinds,
  }));
}
