const updatesLog = [
  {
    title: "Aktualizacja 26.11.2022",
    added: ['Nowa kategoria wydatku "Usługi"'],
    fixed: [
      'Header w "wszystkie wydatki" nie rzuca już cienia w trybie jasnym',
      "Zmiana motywu aplikacji działa za każdym razem",
      "Pasek nawigacyjny teraz jest zawsze w kolorze czarnym",
    ],
    changed: [
      "Nowa ikona przycisku dodawania wydatku",
      'Tytuł aktualizacji w "Co nowego" teraz posiada ikonę gwiazdki',
      "Ładniejszy pasek nawigacyjny",
      '"Fajeczka" zamiast plusa przy dodawaniu wydatku',
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
