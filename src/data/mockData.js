// Données de test basées sur le calendrier COREP fourni

export const phases = [
  {
    id: 1,
    nom_phase: "Pré-campagne (Décembre N-1)",
    description: "Préparation et mise en place des processus"
  },
  {
    id: 2,
    nom_phase: "Phase 1 – Préparation & Collecte (1 → 6 janv.)",
    description: "Lancement et collecte des données"
  },
  {
    id: 3,
    nom_phase: "Phase 2 – Production intermédiaire & Contrôles (7 → 16 janv.)",
    description: "Production et contrôles intermédiaires"
  },
  {
    id: 4,
    nom_phase: "Phase 3 – Consolidation & Validation (17 → 25 janv.)",
    description: "Consolidation et validation des données"
  },
  {
    id: 5,
    nom_phase: "Phase 4 – Préparation dépôt (26 janv. → 10 fév.)",
    description: "Préparation du dépôt final"
  },
  {
    id: 6,
    nom_phase: "Phase 5 – Dépôt & Clôture (11 → 15 fév.)",
    description: "Dépôt officiel et clôture"
  }
]

export const tasks = [
  // Pré-campagne
  {
    id: 1,
    id_phase: 1,
    date_jour: "01/12",
    nom_tache: "Communication calendrier détaillé + RACI + SLA",
    interactions: "PMO → Finance, Risque, IT/RA, ALM, Conformité, DG",
    responsable_R: "PMO Finance",
    responsable_A: "DAF",
    responsable_C: "Risque, IT, Conso, ALM",
    responsable_I: "DG",
    livrables: "Calendrier officiel",
    statut: "Terminé",
    notes: "Calendrier communiqué à toutes les parties prenantes"
  },
  {
    id: 2,
    id_phase: 1,
    date_jour: "05/12",
    nom_tache: "Revue taxonomie EBA, mapping RA",
    interactions: "IT/RA ↔ Risque ↔ Finance",
    responsable_R: "IT/RA",
    responsable_A: "CRO",
    responsable_C: "Finance, Conformité",
    responsable_I: "DG",
    livrables: "Note de synthèse",
    statut: "Terminé",
    notes: "Taxonomie EBA mise à jour"
  },
  {
    id: 3,
    id_phase: 1,
    date_jour: "10/12",
    nom_tache: "Dry-run #1 (extraction GL/risques, DQ de base)",
    interactions: "IT/RA ↔ DataOps ↔ Finance Conso ↔ Risque Crédit",
    responsable_R: "IT/RA",
    responsable_A: "CRO",
    responsable_C: "Finance, DQ",
    responsable_I: "PMO",
    livrables: "Rapport dry-run",
    statut: "En cours",
    notes: "Quelques problèmes de qualité de données identifiés"
  },
  {
    id: 4,
    id_phase: 1,
    date_jour: "20/12",
    nom_tache: "Dry-run #2 : pré-CA1 manuel",
    interactions: "Finance ↔ Risque ↔ IT/RA",
    responsable_R: "Finance Réglementaire",
    responsable_A: "DAF",
    responsable_C: "Risque, IT/RA",
    responsable_I: "DG",
    livrables: "Brouillon CA1",
    statut: "À faire",
    notes: ""
  },

  // Phase 1
  {
    id: 5,
    id_phase: 2,
    date_jour: "J+0",
    nom_tache: "Kick-off + ouverture des flux d'extraction",
    interactions: "PMO → équipes",
    responsable_R: "PMO",
    responsable_A: "DAF",
    responsable_C: "Risque, Conso",
    responsable_I: "DG",
    livrables: "Deck Kick-off",
    statut: "À faire",
    notes: ""
  },
  {
    id: 6,
    id_phase: 2,
    date_jour: "J+1",
    nom_tache: "Extraction balances GL + paramètres Bâlois, garanties, dérivés",
    interactions: "IT/RA ↔ Finance/Risque",
    responsable_R: "IT/RA",
    responsable_A: "CIO",
    responsable_C: "Finance, Risque",
    responsable_I: "PMO",
    livrables: "Fichiers d'extraction",
    statut: "À faire",
    notes: ""
  },

  // Phase 2
  {
    id: 7,
    id_phase: 3,
    date_jour: "J+6",
    nom_tache: "Reconstitution compta/risque, corrections manuelles",
    interactions: "Finance ↔ Risque",
    responsable_R: "Finance Réglementaire",
    responsable_A: "DAF",
    responsable_C: "Risque, IT/RA",
    responsable_I: "PMO",
    livrables: "Journal corrections",
    statut: "À faire",
    notes: ""
  },
  {
    id: 8,
    id_phase: 3,
    date_jour: "J+8",
    nom_tache: "Exécution RA (RWA Crédit, Marché, Opérationnel)",
    interactions: "IT/RA → Risque",
    responsable_R: "IT/RA",
    responsable_A: "CRO",
    responsable_C: "Risque",
    responsable_I: "Finance",
    livrables: "Sorties RA",
    statut: "À faire",
    notes: ""
  },

  // Phase 3
  {
    id: 9,
    id_phase: 4,
    date_jour: "J+17",
    nom_tache: "COREP C01–C07, Leverage, Large Exposures, LCR, NSFR",
    interactions: "Risque Réglementaire",
    responsable_R: "Risque Réglementaire",
    responsable_A: "CRO",
    responsable_C: "Finance",
    responsable_I: "PMO",
    livrables: "COREP v2",
    statut: "À faire",
    notes: ""
  },

  // Phase 4
  {
    id: 10,
    id_phase: 5,
    date_jour: "J+26",
    nom_tache: "Passage complet EBA/ACPR validation rules",
    interactions: "Risque Réglementaire",
    responsable_R: "Risque Réglementaire",
    responsable_A: "CRO",
    responsable_C: "IT/RA",
    responsable_I: "PMO",
    livrables: "Journal contrôles OK",
    statut: "À faire",
    notes: ""
  },

  // Phase 5
  {
    id: 11,
    id_phase: 6,
    date_jour: "J+40",
    nom_tache: "Dépôt officiel COREP/CA1 sur OneGate",
    interactions: "Risque Reporting",
    responsable_R: "Risque Reporting",
    responsable_A: "CRO",
    responsable_C: "IT/RA",
    responsable_I: "DG",
    livrables: "Accusé réception",
    statut: "À faire",
    notes: ""
  }
]

export const risks = [
  {
    id: 1,
    reference: "R0",
    description_risque: "Mauvaise coordination",
    impact: "Retards, rework",
    parade_mitigation: "Calendrier + RACI à D-31 + daily stand-up",
    owner_risque: "PMO"
  },
  {
    id: 2,
    reference: "R1",
    description_risque: "Évolution taxonomie EBA",
    impact: "Rejets validation rules",
    parade_mitigation: "Revue D-27, script tests, pré-dépôt J+31",
    owner_risque: "Risque Réglementaire"
  },
  {
    id: 3,
    reference: "R2",
    description_risque: "Retard d'extraction/données incomplètes",
    impact: "Décalage J+5/J+16",
    parade_mitigation: "Dry-run, SLA DataOps, escalade",
    owner_risque: "IT/RA"
  },
  {
    id: 4,
    reference: "R3",
    description_risque: "Accès OneGate/RA défaillant",
    impact: "Blocage dépôt",
    parade_mitigation: "Vérif D-17, PRA, astreintes",
    owner_risque: "IT Sécurité"
  },
  {
    id: 5,
    reference: "R4",
    description_risque: "Erreurs CA1 manuel",
    impact: "Ratios faux",
    parade_mitigation: "Double calcul, checklist croisée",
    owner_risque: "Finance Réglementaire"
  },
  {
    id: 6,
    reference: "R7",
    description_risque: "Écarts compta/risque non maîtrisés",
    impact: "Incohérences COREP",
    parade_mitigation: "Réconciliations J+3/J+6, seuils d'alerte",
    owner_risque: "Finance Conso"
  },
  {
    id: 7,
    reference: "R8",
    description_risque: "Publication bilan J+5 en retard",
    impact: "Effet domino sur risques",
    parade_mitigation: "Escalade DAF, version provisoire si besoin",
    owner_risque: "Conso"
  },
  {
    id: 8,
    reference: "R9",
    description_risque: "Batch RA en échec",
    impact: "Retard calcul",
    parade_mitigation: "Relance auto, monitoring, buffer",
    owner_risque: "IT/RA"
  }
]

