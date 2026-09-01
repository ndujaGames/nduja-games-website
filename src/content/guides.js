const guidesByProject = {
  midcoil: {
    en: {
      title: "Midcoil",
      lead: "A rope pulled taut. You choose where it snaps.",
      sections: [
        {
          heading: "The goal",
          body: [
            "Midcoil is a logic puzzle. A rope is coiled on a grid, from one edge to the other. You win by snapping it at the exact middle — the node that splits the path into two equal lengths.",
          ],
        },
        {
          heading: "How to play",
          body: [
            "Tap a node to place the marker. Swipe along the rope to move it if you need to. Tap again to snap.",
          ],
        },
        {
          heading: "If you miss",
          body: [
            "Both halves unroll at the same speed. The shorter side finishes first. The gap between the two sounds — or the red flashes at the top and bottom — tells you how far you were from the middle. Use that to aim the next cut.",
          ],
        },
      ],
    },
    it: {
      title: "Midcoil",
      lead: "Una fune tesa. Tu scegli dove si spezza.",
      sections: [
        {
          heading: "L’obiettivo",
          body: [
            "Midcoil è un puzzle di logica. Una fune è avvolta su una griglia, da un bordo all’altro. Vinci spezzandola esattamente al mezzo — il nodo che divide il percorso in due lunghezze uguali.",
          ],
        },
        {
          heading: "Come si gioca",
          body: [
            "Tocca un nodo per piazzare il marcatore. Scorri la fune per spostarlo, se ne hai bisogno. Tocca di nuovo per spezzare.",
          ],
        },
        {
          heading: "Se sbagli",
          body: [
            "Le due metà si srotolano alla stessa velocità. Il lato più corto finisce per primo. L’intervallo tra i due suoni — o i flash rossi in alto e in basso — ti dice quanto eri lontano dal mezzo. Usalo per mirare il taglio successivo.",
          ],
        },
      ],
    },
  },
  abdoku: {
    en: {
      title: "ABdoku",
      lead: "Place one A and one B in each color. Follow the row, column, diagonal, and touch rules to solve the grid.",
      sections: [
        {
          heading: "The goal",
          body: [
            "ABdoku is a logic puzzle. Each colored region on the grid must contain exactly one A and one B. The letters also have to obey rules on rows, columns, diagonals, and contact.",
            "You solve the puzzle when every rule is satisfied at once. Some cells start as fixed clues, marked by a small dot — those letters stay put.",
          ],
        },
        {
          heading: "Rules",
          body: ["All of these must hold together:"],
          list: [
            "Each colored region contains exactly one A and one B — no more, no less.",
            "Each row and each column can contain at most one A.",
            "Each diagonal can contain at most one B.",
            "Two As cannot touch, even diagonally. The same applies to Bs.",
          ],
        },
      ],
    },
    it: {
      title: "ABdoku",
      lead: "Piazza una A e una B per colore. Segui le regole su righe, colonne, diagonali e contatti per risolvere lo schema.",
      sections: [
        {
          heading: "L’obiettivo",
          body: [
            "ABdoku è un puzzle di logica. Ogni area colorata deve contenere esattamente una A e una B. Le lettere devono anche rispettare regole su righe, colonne, diagonali e contatti.",
            "Risolvi lo schema quando tutte le regole sono soddisfatte insieme. Alcune caselle partono con un indizio fisso, segnalato da un puntino — quelle lettere restano al loro posto.",
          ],
        },
        {
          heading: "Regole",
          body: ["Tutte queste condizioni valgono insieme:"],
          list: [
            "Ogni area colorata contiene esattamente una A e una B — né di più, né di meno.",
            "In ogni riga e in ogni colonna può esserci al massimo una A.",
            "In ogni diagonale può esserci al massimo una B.",
            "Due A non possono toccarsi, neanche in diagonale. Lo stesso vale per le B.",
          ],
        },
      ],
    },
  },
  chromawell: {
    en: {
      title: "Chromawell",
      lead: "Survive as long as you can — keep any single color stack from reaching the top, and don’t run out of moves.",
      sections: [
        {
          heading: "The goal",
          body: [
            "Chromawell is a survival puzzle. You last as long as you can. You lose if any single color stack reaches the top of the well, or if the board has no valid moves left.",
            "The well sits above: each color has its own column, and fused colors drop in as bricks. When every column has a brick on the bottom row, that rainbow line clears and the stacks above fall. Below is the board, where you slide and fuse tiles.",
          ],
        },
        {
          heading: "How fusions work",
          body: [
            "Tiles slide until they stop. When two tiles fuse, that color drops into the well as a brick.",
          ],
          list: [
            "Two tiles of the same color fuse into that color.",
            "If two colors sit next to each other on the spectrum, you keep the one you swipe toward.",
            "If two colors have one in between on the loop, they fuse into that middle color.",
            "The rainbow is a loop, so the last color sits next to the first.",
          ],
        },
        {
          heading: "Order, score, and levels",
          body: [
            "When several pairs could fuse, the pair closer to your swipe fuses first. Separate pairs can both fuse.",
            "You score when a rainbow row clears: the more bricks still stacked above it, the fewer points you get. Slow moves add a time penalty. Every 12 lines, a new color appears.",
          ],
        },
      ],
    },
    it: {
      title: "Chromawell",
      lead: "Sopravvivi il più a lungo possibile — evita che una singola pila raggiunga la cima, e non restare senza mosse.",
      sections: [
        {
          heading: "L’obiettivo",
          body: [
            "Chromawell è un puzzle di sopravvivenza. Duri il più a lungo possibile. Perdi se una singola pila di un colore raggiunge la cima del pozzo, o se sul tabellone non restano mosse valide.",
            "In alto c’è il pozzo: ogni colore ha la sua colonna, e i colori fusi ci cadono come mattoni. Quando ogni colonna ha un mattone sulla riga in fondo, quella linea arcobaleno si cancella e le pile sopra scendono. Sotto c’è il tabellone, dove scorri e fondi le pedine.",
          ],
        },
        {
          heading: "Come funzionano le fusioni",
          body: [
            "Le pedine scivolano fino a fermarsi. Quando due pedine si fondono, quel colore cade nel pozzo come un mattone.",
          ],
          list: [
            "Due pedine dello stesso colore fondono in quel colore.",
            "Se due colori sono vicini nello spettro, resta quello verso cui scorri.",
            "Se tra due colori ce n’è uno in mezzo sull’anello, fondono in quel colore di mezzo.",
            "L’arcobaleno è un anello, quindi l’ultimo colore sta accanto al primo.",
          ],
        },
        {
          heading: "Ordine, punteggio e livelli",
          body: [
            "Quando più coppie potrebbero fondere, si fonde prima la coppia più vicina allo swipe. Coppie separate possono fondere insieme.",
            "I punti arrivano quando una riga arcobaleno si cancella: più mattoni restano impilati sopra, meno punti prendi. Le mosse lente danno una penalità di tempo. Ogni 12 linee compare un nuovo colore.",
          ],
        },
      ],
    },
  },
  chessrelay: {
    en: {
      title: "ChessRelay",
      lead: "Pass the baton from piece to piece. Capture with chess moves until the board is clear — or close enough.",
      sections: [
        {
          heading: "The goal",
          body: [
            "The board starts full. One piece at a time is active: that piece holds the baton. Each move puts the mover out. You win if few pieces remain — the puzzle’s goal is shown next to the count of pieces left.",
            "There are no empty squares. Pieces that are out stay on their squares, as silhouettes.",
          ],
        },
        {
          heading: "Passing the baton",
          body: [
            "You move by capturing a live piece of the opposite color, the way that piece would move in chess. The mover goes out. The piece you captured becomes active: now it’s their turn.",
          ],
        },
        {
          heading: "Who passes through",
          body: [
            "Rook, bishop, and queen pass through other pieces: anyone still live on the path goes out. Knight, king, and pawn step or jump, and leave pieces in between alone.",
          ],
        },
        {
          heading: "Winning",
          body: [
            "If there are no moves left and the remaining pieces are within the goal (or just above), you win: one to three stars. If too many pieces remain, you’re stuck.",
          ],
        },
      ],
    },
    it: {
      title: "ChessRelay",
      lead: "Passa il testimone da pezzo a pezzo. Cattura con le mosse degli scacchi fino a ripulire la scacchiera — o quasi.",
      sections: [
        {
          heading: "L’obiettivo",
          body: [
            "La scacchiera parte piena. Un pezzo alla volta è attivo: è lui che tiene il testimone. Ogni mossa spegne chi parte. Vinci se restano pochi pezzi — l’obiettivo dello schema è accanto al conteggio di quelli rimasti.",
            "Non ci sono case vuote. I pezzi spenti restano in casella, come ombre.",
          ],
        },
        {
          heading: "Passare il testimone",
          body: [
            "Muovi catturando un pezzo vivo del colore opposto, come si muoverebbe negli scacchi. Chi muove si spegne. Il pezzo catturato diventa attivo: tocca a lui.",
          ],
        },
        {
          heading: "Chi attraversa",
          body: [
            "Torre, alfiere e regina passano sopra gli altri pezzi: chi è vivo sul percorso si spegne. Cavallo, re e pedone fanno un salto o un passo, senza spegnere chi sta in mezzo.",
          ],
        },
        {
          heading: "Vittoria",
          body: [
            "Se non ci sono più mosse e i pezzi restanti sono entro l’obiettivo (o poco sopra), è vittoria: da una a tre stelle. Se restano troppi pezzi, è stallo.",
          ],
        },
      ],
    },
  },
};

export function getGuide(projectId, lang) {
  const project = guidesByProject[projectId];
  if (!project) return null;
  const locale = lang === "it" ? "it" : "en";
  return project[locale] ?? null;
}
