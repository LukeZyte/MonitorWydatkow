const updatesLog = [
  {
    title: "Aktualizacja 30.11.2022",
    added: [
      "Nowa animacja między etapami w okienkach",
      "Po przekroczeniu miesięcznego budżetu pojawia się odpowiedni tekst pod monitorem wydatków",
    ],
    changed: [
      "Gradient koloru czerwonego poczas przekroczenia budżetu",
      "Zmiana odcienia niebieskiego w przycisku",
      "Kliknięcie poza okienko wyboru daty spowoduje jego zamknięcie",
      "Wybór pełnej daty zmienia się teraz tylko po kliknięciu przycisku zatwierdzenia - wybór niepełnej daty ( bez dnia ) dalej działa na bieżąco",
    ],
    knownIssues: [
      "Biały pasek nawigacyjny ( czasem czarny ) u dołu ekranu (jeżeli widoczny) podczas wyświetlania okna",
    ],
  },
  {
    title: "Aktualizacja 29.11.2022",
    added: [
      "Opcja planowania budżetu miesięcznego w profilu",
      "ProgressBar jeżeli wybrany został plan budżetowy ( póki co działa tylko dla aktualnego miesiąca )",
      "Miesięczny budżet o ile zdefiniowany jest napisany pod sumą wydatków",
    ],
    fixed: [
      "Teraz wpisanie przecinka do formularza wpisuje kropkę, zamiast usuwać wprowadzony znak",
    ],
    changed: ["Co nowego wyróżnia się od innych opcji"],
    knownIssues: [
      "Biały pasek nawigacyjny ( czasem czarny ) u dołu ekranu (jeżeli widoczny) podczas wyświetlania okna",
    ],
  },
  {
    title: "Aktualizacja 26.11.2022",
    added: ['Nowe kategorie wydatku "Usługi", "Suplementy"'],
    fixed: [
      'Header w "wszystkie wydatki" nie rzuca już cienia w trybie jasnym',
      "Zmiana motywu aplikacji działa za każdym razem",
      "Pasek nawigacyjny teraz dostosowywuje się do motywu aplikacji",
    ],
    changed: [
      "Nowa ikona przycisku dodawania wydatku",
      'Tytuł aktualizacji w "Co nowego" teraz posiada ikonę gwiazdki',
      "Ładniejszy pasek nawigacyjny",
      '"Fajeczka" zamiast plusa przy dodawaniu wydatku',
      "Kolory niektórych kategorii uległy zmianie",
    ],
    knownIssues: [
      "Godzina i pasek nawigacyjny jest niewidoczny (powodem jest dziwne zachowaniu kolorów podczas otwierania okien)",
    ],
  },
  {
    title: "Aktualizacja 25.11.2022",
    added: [
      "Nowy przycisk w profilu do wyświetlania informacji o aktualizacjach",
      'Linki do profilu na telegram i facebook w "Co nowego"',
    ],
    changed: ['Nowy design okienka "Co nowego"'],
    fixed: ["Przycisk do zmiany motywu teraz pokazuje poprawną ikonę"],
    removed: ["Przycisk informacji z prawego górnego rogu ekranu"],
    knownIssues: [
      "Nie zawsze reagujące przyciski w opcjach",
      "Biały pasek nawigacyjny u dołu ekranu (jeżeli widoczny)",
    ],
  },
  {
    title: "Aktualizacja 12.11.2022",
    added: [
      'Dodano logo w zakładce "Wydatki"',
      "Nowe okno komunikatu podczas usuwania wydatku",
    ],
    changed: ["Nowy wygląd okienek", "Nowa paleta kolorów"],
    knownIssues: [
      "Nie zawsze reagujące przyciski w opcjach",
      'Natywne, białe okno w "Co nowego"',
      "Biały pasek nawigacyjny u dołu ekranu (jeżeli widoczny)",
    ],
  },
];

export default updatesLog;
