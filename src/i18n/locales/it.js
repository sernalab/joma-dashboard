export default {
  login: {
    title: "Benvenuto",
    subtitle: "Inserisci le tue credenziali",
    userId: "ID Utente",
    password: "Password",
    submit: "Accedi",
    error: {
      credentials: "Credenziali non valide",
      required: "Inserisci tutte le credenziali richieste",
    },
  },
  menu: {
    home: "Home",
    reports: "Report",
    features: "Funzionalità",
    contact: "Contatti",
    settings: "Impostazioni",
    projects: "Progetti",
    components: "Componenti",
    blocks: "Blocchi",
    uiKit: "UI Kit",
    templates: "Template",
    apollo: "Apollo",
    ultima: "Ultima",
    printReports: "Stampa Report",
  },
  extras: {
    cylinder: "Cilindro",
    noDataAvailable: "Nessun dato disponibile",
    noDataAvailableDescription:
      "Non ci sono ancora misurazioni disponibili in questa sezione.",
    backToDashbaord: "Torna alla Dashboard",
  },
  selectionView: {
    manometer: {
      title: "Manometro",
      description: "Manometro da 80 bar",
    },
    vacuum: {
      title: "Vuoto",
      description: "Misurazione della pressione negativa nei sistemi di vuoto.",
    },
    oilPressure: {
      title: "Pressione dell'olio",
      description: "Monitoraggio della pressione dell'olio motore.",
    },
    fuelPressure: {
      title: "Pressione del carburante",
      description:
        "Misurazione della pressione del sistema di iniezione carburante.",
    },
    commonRail: {
      title: "Common Rail",
      description:
        "Diagnosi della pressione nei sistemi di iniezione Common Rail.",
    },
    compression: {
      title: "Compressione",
      description: "Valutazione della compressione nei cilindri del motore.",
    },
    turboPressure: {
      title: "Pressione del turbo",
      description:
        "Controllo della pressione nel sistema di sovralimentazione.",
    },
    brakePressure: {
      title: "Pressione dei freni",
      description: "Misurazione della pressione nel circuito dei freni.",
    },
    dpfPressure: {
      title: "Pressione DPF",
      description:
        "Monitoraggio della pressione differenziale nel filtro antiparticolato (DPF).",
    },
    adbluePressure: {
      title: "Pressione AdBlue",
      description:
        "Misurazione della pressione nel sistema AdBlue per la riduzione delle emissioni.",
    },
  },
  sideMenu: {
    graphics: "Grafici",
    manometer: "Manometro",
    vacuum: "Vuoto",
    oilPressure: "Pressione dell'olio",
    fuelPressure: "Pressione del carburante",
    commonRail: "Common Rail",
    compression: "Compressione",
    turboPressure: "Pressione del turbo",
    brakePressure: "Pressione dei freni",
    dpfPressure: "Pressione DPF",
    adbluePressure: "Pressione AdBlue",
    profile: "Profilo",
    logout: "Disconnetti",
  },
  printView: {
    clientData: "Dati Cliente",
    name: "Nome Cliente",
    phone: "Telefono",
    email: "Email",
    vehicleDetails: "Dettagli del Veicolo",
    brand: "Marca",
    model: "Modello",
    plate: "Targa",
    year: "Anno",
    mileage: "Chilometraggio",
    measurements: "Misurazioni da Eseguire",
    observations: "Osservazioni",
    addNotes: "Aggiungi note o commenti sulle misurazioni",
    generateReport: "Genera Report",
    technicalReport: "Report Tecnico",
    noDataAvailable: "Nessun dato disponibile per {chartName}.",
    selectedCharts: "Grafici Selezionati",
    print: "Stampa",
    selectMeasurements: "Seleziona Misurazioni",
  },
  chartsData: {
    datacompression: {
      title: "Compressione dei Cilindri",
      yAxisTitle: "Pressione (Bar)",
      description: "Misurazioni della compressione nei cilindri del motore",
      cylinderLabel: "Cilindro",
    },
    commonRail: {
      title: "Pressione Common Rail",
      yAxisTitle: "Pressione (Bar)",
      description: "Misurazione della pressione nel sistema Common Rail",
      readingLabel: "Lettura",
    },
    adblue: {
      title: "Pressione AdBlue",
      yAxisTitle: "Pressione (Bar)",
      description: "Misurazione della pressione nel sistema AdBlue",
      readingLabel: "Lettura",
    },
    fuel: {
      title: "Pressione del Carburante",
      yAxisTitle: "Pressione (Bar)",
      description: "Misurazione della pressione nel sistema di alimentazione",
      readingLabel: "Lettura",
    },
    manometer: {
      title: "Manometro",
      yAxisTitle: "Pressione (Bar)",
      description: "Misurazioni di pressione con manometro",
      readingLabel: "Lettura",
    },
    oil: {
      title: "Pressione dell'Olio",
      yAxisTitle: "Pressione (Bar)",
      description: "Misurazione della pressione del sistema dell'olio",
      readingLabel: "Lettura",
    },
    turbo: {
      title: "Pressione del Turbo",
      yAxisTitle: "Pressione (Bar)",
      description: "Misurazione della pressione del turbo",
      readingLabel: "Lettura",
    },
    vacuum: {
      title: "Vuoto",
      yAxisTitle: "Pressione (mBar)",
      description: "Misurazione del vuoto nel sistema",
      readingLabel: "Lettura",
    },
    generic: {
      valueLabel: "Valore",
      pointLabel: "Punto",
      dataLabel: "Dati di",
    },
  },
};
