export default {
  login: {
    title: "Benvingut",
    subtitle: "Introdueix les teves credencials",
    userId: "ID d'Usuari",
    password: "Contrasenya",
    submit: "Iniciar Sessió",
    error: {
      credentials: "Credencials no vàlides",
      required: "Si us plau, introdueix totes les credencials necessàries",
    },
  },
  menu: {
    home: "Inici",
    reports: "Informes",
    features: "Característiques",
    contact: "Contacte",
    settings: "Configuració",
    projects: "Projectes",
    components: "Components",
    blocks: "Blocs",
    uiKit: "Kit UI",
    templates: "Plantilles",
    apollo: "Apollo",
    ultima: "Ultima",
    printReports: "Imprimir Informes",
  },
  extras: {
    cylinder: "Cilindre",
    noDataAvailable: "No hi ha dades disponibles",
    noDataAvailableDescription:
      "Encara no hi ha mesures disponibles en aquesta secció.",
    backToDashbaord: "Tornar al Tauler",
  },
  selectionView: {
    manometer: {
      title: "Manòmetre",
      description: "Manòmetre de 80 bar",
    },
    vacuum: {
      title: "Buit",
      description: "Mesura de la pressió negativa en sistemes de buit.",
    },
    oilPressure: {
      title: "Pressió de l'oli",
      description: "Monitoratge de la pressió de l'oli del motor.",
    },
    fuelPressure: {
      title: "Pressió del combustible",
      description:
        "Mesura de la pressió del sistema d'injecció de combustible.",
    },
    commonRail: {
      title: "Common Rail",
      description:
        "Diagnòstic de la pressió en sistemes d'injecció common rail.",
    },
    compression: {
      title: "Compressió",
      description: "Avaluació de la compressió en els cilindres del motor.",
    },
    turboPressure: {
      title: "Pressió del turbo",
      description: "Control de la pressió en el sistema de turboalimentació.",
    },
    brakePressure: {
      title: "Pressió dels frens",
      description: "Mesura de la pressió en el circuit de frenada.",
    },
    dpfPressure: {
      title: "Pressió del filtre de partícules",
      description:
        "Monitoratge de la pressió diferencial en el filtre de partícules (DPF).",
    },
    adbluePressure: {
      title: "Pressió AdBlue",
      description:
        "Mesura de la pressió en el sistema AdBlue per a la reducció d'emissions.",
    },
  },
  sideMenu: {
    graphics: "Gràfics",
    manometer: "Manòmetre",
    vacuum: "Buit",
    oilPressure: "Pressió de l'oli",
    fuelPressure: "Pressió del combustible",
    commonRail: "Common Rail",
    compression: "Compressió",
    turboPressure: "Pressió del turbo",
    brakePressure: "Pressió dels frens",
    dpfPressure: "Pressió del filtre de partícules",
    adbluePressure: "Pressió AdBlue",
    profile: "Perfil",
    logout: "Tancar sessió",
  },
  printView: {
    clientData: "Dades del Client",
    name: "Nom del Client",
    phone: "Telèfon",
    email: "Correu Electrònic",
    vehicleDetails: "Detalls del Vehicle",
    brand: "Marca",
    model: "Model",
    plate: "Matrícula",
    year: "Any",
    mileage: "Quilometratge",
    measurements: "Mesures a Realitzar",
    observations: "Observacions",
    addNotes: "Afegeix notes o comentaris sobre les mesures",
    generateReport: "Generar Informe",
    technicalReport: "Informe Tècnic",
    noDataAvailable: "No hi ha dades disponibles per a {chartName}.",
    selectedCharts: "Gràfics Seleccionats",
    print: "Imprimir",
    selectMeasurements: "Seleccionar Mesures",
  },
  chartsData: {
    datacompression: {
      title: "Compressió dels Cilindres",
      yAxisTitle: "Pressió (Bar)",
      description: "Mesures de compressió dels cilindres del motor",
      cylinderLabel: "Cilindre",
    },
    commonRail: {
      title: "Pressió Common Rail",
      yAxisTitle: "Pressió (Bar)",
      description: "Mesura de la pressió en el sistema Common Rail",
      readingLabel: "Lectura",
    },
    adblue: {
      title: "Pressió AdBlue",
      yAxisTitle: "Pressió (Bar)",
      description: "Mesura de la pressió en el sistema AdBlue",
      readingLabel: "Lectura",
    },
    fuel: {
      title: "Pressió del Combustible",
      yAxisTitle: "Pressió (Bar)",
      description: "Mesura de la pressió en el sistema de combustible",
      readingLabel: "Lectura",
    },
    manometer: {
      title: "Manòmetre",
      yAxisTitle: "Pressió (Bar)",
      description: "Mesures de pressió amb manòmetre",
      readingLabel: "Lectura",
    },
    oil: {
      title: "Pressió de l'oli",
      yAxisTitle: "Pressió (Bar)",
      description: "Mesura de la pressió en el sistema d'oli",
      readingLabel: "Lectura",
    },
    turbo: {
      title: "Pressió del Turbo",
      yAxisTitle: "Pressió (Bar)",
      description: "Mesura de la pressió del turbo",
      readingLabel: "Lectura",
    },
    vacuum: {
      title: "Buit",
      yAxisTitle: "Pressió (mBar)",
      description: "Mesura del buit en el sistema",
      readingLabel: "Lectura",
    },
    generic: {
      valueLabel: "Valor",
      pointLabel: "Punt",
      dataLabel: "Dades de",
    },
  },
};
