export default {
  login: {
    title: "Witamy",
    subtitle: "Wprowadź swoje dane logowania",
    userId: "ID użytkownika",
    password: "Hasło",
    submit: "Zaloguj się",
    error: {
      credentials: "Nieprawidłowe dane logowania",
      required: "Proszę wprowadzić wszystkie wymagane dane logowania",
    },
  },
  menu: {
    home: "Strona główna",
    reports: "Raporty",
    features: "Funkcje",
    contact: "Kontakt",
    settings: "Ustawienia",
    projects: "Projekty",
    components: "Komponenty",
    blocks: "Bloki",
    uiKit: "Zestaw UI",
    templates: "Szablony",
    apollo: "Apollo",
    ultima: "Ultima",
    printReports: "Drukuj raporty",
  },
  extras: {
    cylinder: "Cylinder",
    noDataAvailable: "Brak dostępnych danych",
    noDataAvailableDescription: "Brak dostępnych pomiarów w tej sekcji.",
    backToDashbaord: "Powrót do panelu",
  },
  selectionView: {
    manometer: {
      title: "Manometr",
      description: "Manometr o zakresie ciśnienia do 80 barów",
    },
    vacuum: {
      title: "Próżnia",
      description: "Pomiar ciśnienia ujemnego w systemach próżniowych.",
    },
    oilPressure: {
      title: "Ciśnienie oleju",
      description: "Monitorowanie ciśnienia oleju w silniku.",
    },
    fuelPressure: {
      title: "Ciśnienie paliwa",
      description: "Pomiar ciśnienia w układzie wtrysku paliwa.",
    },
    commonRail: {
      title: "Common Rail",
      description: "Diagnostyka ciśnienia w systemach wtrysku Common Rail.",
    },
    compression: {
      title: "Kompresja",
      description: "Ocena kompresji w cylindrach silnika.",
    },
    turboPressure: {
      title: "Ciśnienie turbosprężarki",
      description: "Kontrola ciśnienia w układzie doładowania.",
    },
    brakePressure: {
      title: "Ciśnienie hamulców",
      description: "Pomiar ciśnienia w układzie hamulcowym.",
    },
    dpfPressure: {
      title: "Ciśnienie DPF",
      description:
        "Monitorowanie różnicy ciśnień w filtrze cząstek stałych (DPF).",
    },
    adbluePressure: {
      title: "Ciśnienie AdBlue",
      description: "Pomiar ciśnienia w układzie AdBlue w celu redukcji emisji.",
    },
  },
  sideMenu: {
    graphics: "Wykresy",
    manometer: "Manometr",
    vacuum: "Próżnia",
    oilPressure: "Ciśnienie oleju",
    fuelPressure: "Ciśnienie paliwa",
    commonRail: "Common Rail",
    compression: "Kompresja",
    turboPressure: "Ciśnienie turbo",
    brakePressure: "Ciśnienie hamulców",
    dpfPressure: "Ciśnienie DPF",
    adbluePressure: "Ciśnienie AdBlue",
    profile: "Profil",
    logout: "Wyloguj się",
  },
  printView: {
    clientData: "Dane klienta",
    name: "Imię i nazwisko",
    phone: "Telefon",
    email: "E-mail",
    vehicleDetails: "Dane pojazdu",
    brand: "Marka",
    model: "Model",
    plate: "Numer rejestracyjny",
    year: "Rok",
    mileage: "Przebieg",
    measurements: "Pomiary do wykonania",
    observations: "Uwagi",
    addNotes: "Dodaj notatki lub komentarze dotyczące pomiarów",
    generateReport: "Generuj raport",
    technicalReport: "Raport techniczny",
    noDataAvailable: "Brak dostępnych danych dla {chartName}.",
    selectedCharts: "Wybrane wykresy",
    print: "Drukuj",
    selectMeasurements: "Wybierz pomiary",
  },
  chartsData: {
    datacompression: {
      title: "Kompresja cylindrów",
      yAxisTitle: "Ciśnienie (Bar)",
      description: "Pomiary kompresji w cylindrach silnika",
      cylinderLabel: "Cylinder",
    },
    commonRail: {
      title: "Ciśnienie Common Rail",
      yAxisTitle: "Ciśnienie (Bar)",
      description: "Pomiar ciśnienia w systemie Common Rail",
      readingLabel: "Odczyt",
    },
    adblue: {
      title: "Ciśnienie AdBlue",
      yAxisTitle: "Ciśnienie (Bar)",
      description: "Pomiar ciśnienia w systemie AdBlue",
      readingLabel: "Odczyt",
    },
    fuel: {
      title: "Ciśnienie paliwa",
      yAxisTitle: "Ciśnienie (Bar)",
      description: "Pomiar ciśnienia w układzie paliwowym",
      readingLabel: "Odczyt",
    },
    manometer: {
      title: "Manometr",
      yAxisTitle: "Ciśnienie (Bar)",
      description: "Pomiary ciśnienia za pomocą manometru",
      readingLabel: "Odczyt",
    },
    oil: {
      title: "Ciśnienie oleju",
      yAxisTitle: "Ciśnienie (Bar)",
      description: "Pomiar ciśnienia w układzie olejowym",
      readingLabel: "Odczyt",
    },
    turbo: {
      title: "Ciśnienie turbosprężarki",
      yAxisTitle: "Ciśnienie (Bar)",
      description: "Pomiar ciśnienia w turbosprężarce",
      readingLabel: "Odczyt",
    },
    vacuum: {
      title: "Próżnia",
      yAxisTitle: "Ciśnienie (mBar)",
      description: "Pomiar ciśnienia w systemie próżniowym",
      readingLabel: "Odczyt",
    },
    generic: {
      valueLabel: "Wartość",
      pointLabel: "Punkt",
      dataLabel: "Dane dla",
    },
  },
};
