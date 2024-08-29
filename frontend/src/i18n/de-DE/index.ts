/* eslint-disable sonarjs/no-duplicate-string */
export default {
  generalSettings: 'Allgemeine Einstellungen',
  changeDisplayLanguage: 'Anzeigesprache',
  changeDisplayLanguageInfo: 'Wählen Sie Ihre bevorzugte Anzeigesprache',
  nav: {
    audits: 'Audits',
    vulnerabilities: 'Schwachstellen',
    data: 'Daten',
  },
  btn: {
    cancel: 'Abbrechen',
    confirm: 'Bestätigen',
    create: 'Erstellen',
    topButtonSection: {
      submitReview: 'Zur Prüfung einreichen',
      cancelReview: 'Überprüfung abbrechen',
      approve: 'Freigeben',
      removeApproval: 'Freigabe entfernen',
    },
    backupFinding: 'Neue Schwachstelle / Änderung in Datenbank vorschlagen',
    delete: 'Löschen',
    save: 'Speichern',
    update: 'Aktualisieren',
    deleteAll: 'Alle löschen',
    enable: 'Aktiviert',
    valid: 'Geprüft',
    new: 'Neu',
    updates: 'Aktualisierungen',
  },
  tooltip: {
    usersConnected: 'Benutzer im Audit:',
    editAudit: 'Audit bearbeiten',
    downloadReport: 'Report herunterladen',
    deleteAudit: 'Audit löschen',
    topButtonSection: {
      submitReview: 'Audit als prüfbereit markieren',
      cancelReview: 'Änderungen am Audit vornehmen',
      approve: 'Dieses Audit freigeben',
      removeApproval: 'Auditfreigabe entfernen',
    },
    sortOptions: 'Sortieroptionen',
    addToFindings: 'Zu Ergebnis hinzufügen',
    edit: 'Bearbeiten',
    view: 'Ansicht',
    findAudits: 'Audits finden',
    delete: 'Löschen',
    download: 'Download',
  },
  msg: {
    auditReviewUpdateOk: 'Prüfstatus des Audits erfolgreich aktualisiert',
    auditApprovalUpdateOk: 'Auditfreigabe erfolgreich aktualisiert',
    auditUpdateOk: 'Audit erfolgreich aktualisiert',
    findingCreateOk: 'Ergebnis erfolgreich erstellt',
    findingUpdateOk: 'Ergebnis erfolgreich aktualisiert',
    findingDeleteOk: 'Ergebnis erfolgreich gelöscht',
    doYouWantToLeave: 'Möchten Sie die Seite wirklich verlassen ?',
    thereAreUnsavedChanges: 'Es gibt ungespeicherte Änderungen !',
    fieldRequired: 'Bitte füllen Sie alle benötigten Felder aus',
    deleteFindingConfirm: 'Aktuelles Ergebnis löschen ?',
    deleteFindingNotice: 'Diese Aktion kann nicht rückgängig gemacht werden',
    selectHost: 'Host auswählen',
    importHostsFirst: 'Hosts zuerst importieren',
    auditTypeNotSet: 'Audit-Typ ist nicht gesetzt',
    sectionUpdateOk: 'Abschnitt erfolgreich aktualisiert',
    lastnameRequired: 'Nachname benötigt',
    firstnameRequired: 'Vorname benötigt',
    emailRequired: 'E-Mail benötigt',
    clientCreatedOk: 'Kunde erfolgreich erstellt',
    clientUpdatedOk: 'Kunde erfolgreich aktualisiert',
    clientDeletedOk: 'Kunde erfolgreich gelöscht',
    deleteNotice: 'wird endgültig gelöscht',
    confirmSuppression: 'Unterdrückung bestätigen',
    usernameRequired: 'Benutzername benötigt',
    passwordRequired: 'Passwort benötigt',
    currentPasswordRequired: 'Aktuelles Passwort benötigt',
    confirmPasswordDifferents:
      'Neues Passwort und Passwort bestätigen sind unterschiedlich',
    collaboratorCreatedOk: 'Mitarbeiter erfolgreich erstellt',
    collaboratorUpdatedOk: 'Mitarbeiter erfolgreich aktualisiert',
    collaboratorDeletedOk: 'Mitarbeiter erfolgreich gelöscht',
    nameRequired: 'Name benötigt',
    fileRequired: 'Datei benötigt',
    companyCreatedOk: 'Firma erfolgreich erstellt',
    companyUpdatedOk: 'Firma erfolgreich aktualisiert',
    companyDeletedOk: 'Firma erfolgreich gelöscht',
    templateNotFound: 'Vorlage nicht gefunden',
    templateCreatedOk: 'Vorlage erfolgreich erstellt',
    templateUpdatedOk: 'Vorlage erfolgreich aktualisiert',
    allVulnerabilitesDeleteNotice:
      'Alle Schwachstellen werden endgültig gelöscht',
    allVulnerabilitesDeleteOk:
      'Alle Schwachstellen wurden erfolgreich gelöscht',
    profileUpdateOk: 'Profil erfolgreich aktualisiert',
    settingsUpdatedOk: 'Einstellungen erfolgreich aktualisiert',
    revertingSettings: 'Einstellungen zurücksetzen !',
    revertingSettingsConfirm:
      'Wollen Sie wirklich alle Einstellungen auf ihre Standardwerte zurücksetzen? Alle aktuellen Einstellungen gehen verloren.',
    importingSettings: 'Einstellungen importieren !',
    importingSettingsConfirm:
      'Wollen Sie die neuen Einstellungen wirklich importieren? Sie werden alle aktuellen Einstellungen verlieren, die ersetzt werden.',
    settingsImportedOk: 'Einstellungen erfolgreich importiert',
    vulnerabilityCreatedOk: 'Schwachstelle erfolgreich erstellt',
    vulnerabilityUpdatedOk: 'Schwachstelle erfolgreich aktualisiert',
    vulnerabilityDeletedOk: 'Schwachstelle erfolgreich gelöscht',
    vulnerabilityWillBeDeleted: 'Schwachstelle wird endgültig gelöscht',
    confirmCategoryChange: 'Kategorieänderung bestätigen',
    categoryChangingNotice:
      'Das Anzeigen benutzerdefinierter Felder könnte durch das Ändern der Kategorie beeinträchtigt werden',
    vulnerabilityMergeOk: 'Schwachstellen erfolgreich zusammengeführt',
    tryingToContactBackend: '<p>Versuche das Backend zu erreichen</p>',
    wrongContactingBackend:
      'Beim Versuch das Backend zu erreichen ist etwas schief gegangen',
  },
  err: {
    notDefinedLanguage: 'Für diese Sprache nicht definiert',
    invalidYamlFormat: 'Ungültiges YAML-Format erkannt',
    parsingError1: 'Parsingfehler: {0}',
    parsingError2: 'Parsingfehler: Zeile {0}, Spalte: {1}',
    invalidJsonFormat: 'Ungültiges JSON-Format erkannt',
    jsonMustBeAnObject: 'JSON muss ein Objekt sein.',
    importingSettingsError: 'Fehler beim Importieren der Einstellungen',
    errorWhileParsingJsonContent: 'Fehler beim Parsen des JSON-Inhalts: {0}',
    titleRequired: 'Titel benötigt',
    expiredToken: 'Token abgelaufen',
    invalidToken: 'Token ungültig',
    invalidCredentials: 'Ungültige Zugangsdaten',
  },
  cvss: {
    title: 'CVSS v3.1 Basiswert',
    impactSubscore: 'Teilbewertung Auswirkung (Impact)',
    exploitabilitySubscore: 'Teilbewertung Ausnutzbarkeit (Exploitability)',
    infoWhenNoScore:
      'Wählen Sie Werte für alle Basismetriken um einen Score zu berechnen',
    attackVector: 'Angriffsvektor',
    attackComplexity: 'Angriffskomplexität',
    privilegesRequired: 'Benötigte Privilegien',
    userInteraction: 'Benutzerinteraktion',
    scope: 'Geltungsbereich',
    confidentialityImpact: 'Auswirkung auf Vertraulichkeit',
    integrityImpact: 'Auswirkung auf Integrität',
    availabilityImpact: 'Auswirkung auf Verfügbarkeit',
    network: 'Netzwerk',
    adjacentNetwork: 'Angrenzendes Netzwerk',
    local: 'Lokal',
    physical: 'Physisch',
    low: 'Niedrig',
    high: 'Hoch',
    none: 'Keine',
    required: 'Benötigt',
    unchanged: 'Unverändert',
    changed: 'Verändert',
    temporalEnvironmentalTitle: 'Temporal und Environmental Scores',
    temporalTitle: 'Temporal Score',
    environmentalTitle: 'Environmental Score',
    environmentalModifiedImpact: 'Modifizierter Impact Subscore',
    environmentalModifiedExploitability:
      'Modifizierter Exploitability Subscore',
    exploitCodeMaturity: 'Reife des Exploitcode',
    remediationLevel: 'Verfügbare Lösungen',
    reportConfidence: 'Glaubwürdigkeit der Berichte',
    confidentialityRequirement: 'Anforderung an Vertraulichkeit',
    integrityRequirement: 'Anforderung an Integrität',
    availabilityRequirement: 'Anforderung an Verfügbarkeit',
    modifiedAttackVector: 'Modifizierter Angriffsvektor',
    modifiedAttackComplexity: 'Modifizierte Angriffskomplexität',
    modifiedPrivilegesRequired: 'Modifizierte benötite Privilegien',
    modifiedUserInteraction: 'Modifizierte Benutzerinteraktion',
    modifiedScope: 'Modifizierter Anwendungsbereich',
    modifiedConfidentialityImpact:
      'Modifizierte Auswirkung auf Vertraulichkeit',
    modifiedIntegrityImpact: 'Modifizierte Auswirkung auf Integrität',
    modifiedAvailabilityImpact: 'Modifizierte Auswirkung auf Verfügbarkeit',
    notDefined: 'Nicht definiert',
    unproven: 'Nicht belegt',
    poc: 'Proof-of-Concept',
    functional: 'Funktional',
    officialFix: 'Offizieller Fix',
    temporaryFix: 'Temporärer Fix',
    workaround: 'Workaround',
    unavailable: 'Nicht verfügbar',
    unknown: 'Unbekannt',
    reasonable: 'Annehmbar',
    confirmed: 'Bestätigt',
    medium: 'Mittel',
    tooltip: {
      baseMetricGroup_Legend:
        'Die Gruppe der Basismetriken stellt die intrinsischen Merkmale einer Schwachstelle dar, die im Laufe der Zeit und über Benutzerumgebungen hinweg konstant sind. Bestimmen Sie die anfällige Komponente und bewerten Sie den Angriffsvektor, die Angriffskomplexität, die erforderlichen Berechtigungen und die Benutzerinteraktion relativ dazu.',
      AV_Heading:
        'Diese Metrik spiegelt den Kontext wider, in dem die Ausnutzung von Schwachstellen möglich ist. Der Base Score erhöht sich, je weiter (logisch und physisch) entfernt ein Angreifer sein kann, um die verwundbare Komponente auszunutzen.',
      AV_N_Label:
        "Die verwundbare Komponente ist an den Netzwerkstack gebunden und die Menge möglicher Angreifer erstreckt sich über die anderen aufgeführten Optionen hinaus bis hin zum gesamten Internet. Eine solche Schwachstelle wird oft als 'aus der Ferne ausnutzbar' (remotely exploitable) bezeichnet und kann als Angriff betrachtet werden, der auf Protokollebene einen oder mehrere Netzwerksprünge entfernt (z. B. über einen oder mehrere Router) ausnutzbar ist.",
      AV_A_Label:
        'Die verwundbare Komponente ist an den Netzwerkstack gebunden, aber der Angriff ist auf Protokollebene auf eine logisch benachbarte Topologie beschränkt. Dies kann bedeuten, dass ein Angriff von demselben gemeinsam genutzten physischen (z. B. Bluetooth oder IEEE 802.11) oder logischen (z. B. lokales IP-Subnetz) Netzwerk oder von innerhalb einer sicheren oder anderweitig eingeschränkten Verwaltungsdomäne (z. B. MPLS, VPN in ein sicheres Admin-Netzwerk) gestartet werden muss.',
      AV_L_Label:
        'Die verwundbare Komponente ist nicht an den Netzwerkstack gebunden und der Weg des Angreifers führt über Lese-/Schreib-/Ausführungsfunktionen. Ein Angreifer nutzt die Schwachstelle aus, indem er lokal (z. B. Tastatur, Konsole) oder remote (z. B. SSH) auf das Zielsystem zugreift; oder er verlässt sich auf die Benutzerinteraktion einer anderen Person, um Aktionen auszuführen, die zum Ausnutzen der Schwachstelle erforderlich sind (z. B. einen legitimen Benutzer dazu verleiten, ein bösartiges Dokument zu öffnen).',
      AV_P_Label:
        'Der Angriff erfordert, dass der Angreifer die verwundbare Komponente physisch berührt oder manipuliert. Die körperliche Interaktion kann kurzfristig oder dauerhaft sein.',
      AC_Heading:
        'Diese Metrik beschreibt die Bedingungen, die außerhalb der Kontrolle des Angreifers liegen, die existieren müssen, um die Schwachstelle auszunutzen. Solche Bedingungen können das Sammeln weiterer Informationen über das Ziel oder Abweichungen vom Normalzustand erfordern. Die Bewertung dieser Metrik betrachtet explizit nicht ob und welche Benutzerinteraktionen notwendig sind, um die Schwachstelle auszunutzen. Wenn für einen erfolgreichen Angriff eine bestimmte Konfiguration erforderlich ist, sollten die Basismetriken unter der Annahme bewertet werden, dass sich die anfällige Komponente in dieser Konfiguration befindet.',
      AC_L_Label:
        'Besondere Zugangsbedingungen oder mildernde Umstände bestehen nicht. Ein Angreifer kann mit wiederholbarem Erfolg gegen die anfällige Komponente rechnen.',
      AC_H_Label:
        'Ein erfolgreicher Angriff hängt von Bedingungen ab, die außerhalb der Kontrolle des Angreifers liegen. Das heißt, ein erfolgreicher Angriff kann nicht nach Belieben durchgeführt werden, sondern erfordert, dass der Angreifer einen signifikanten Aufwand in die Vorbereitung oder Ausführung gegen die verwundbare Komponente investiert, bevor ein erfolgreicher Angriff erwartet werden kann. Zum Beispiel, kann ein erfolgreicher Angriff erfordern, dass ein Angreifer: Wissen über die Umgebung sammelt, in der das verwundbare Ziel/die verwundbare Komponente vorhanden ist; Die Zielumgebung präparieren muss, um die Exploit-Zuverlässigkeit zu verbessern; oder sich selbst in den logischen Netzwerkpfad zwischen dem Ziel und der vom Opfer angeforderten Ressource einschleusen muss, um die Netzwerkkommunikation zu lesen und/oder zu modifizieren (z. B. ein Man-in-the-Middle-Angriff).',
      PR_Heading:
        'Diese Metrik beschreibt die Berechtigungsstufe, die ein Angreifer besitzen muss, bevor er die Schwachstelle erfolgreich ausnutzen kann.',
      PR_N_Label:
        'Der Angreifer ist vor dem Angriff nicht autorisiert und benötigt daher keinen Zugriff auf Einstellungen oder Dateien, um einen Angriff durchzuführen.',
      PR_L_Label:
        'Der Angreifer ist mit (für den Angriff erforderlichen) Privilegien autorisiert, die grundlegende Benutzerfunktionen bereitstellen, die normalerweise nur Einstellungen und Dateien betreffen, die einem Benutzer gehören. Alternativ kann ein Angreifer mit niedrigen Rechten möglicherweise nur Auswirkungen auf nicht vertrauliche Ressourcen haben.',
      PR_H_Label:
        'Der Angreifer ist mit (für den Angriff erforderlichen) Privilegien autorisiert, die eine erhebliche (z. B. administrative) Kontrolle über die anfällige Komponente bieten, die sich auf komponentenweite Einstellungen und Dateien auswirken könnte.',
      UI_Heading:
        'Diese Metrik beschreibt die Voraussetzungen in wie weit sich ein anderer Benutzer als den Angreifer, sich an einer erfolgreichen Kompromittierung der anfälligen Komponente beteiligen muss. Diese Metrik bestimmt, ob die Schwachstelle nur nach Belieben des Angreifers ausgenutzt werden kann oder ob ein separater Benutzer (oder ein vom Benutzer initiierter Prozess) in irgendeiner Weise daran teilnehmen muss.',
      UI_N_Label:
        'Das anfällige System kann ohne Interaktion eines Benutzers ausgenutzt werden.',
      UI_R_Label:
        'Die erfolgreiche Ausnutzung dieser Schwachstelle erfordert, dass ein Benutzer einige Handlungen tätigt, bevor die Schwachstelle ausgenutzt werden kann.',
      S_Heading:
        'Wirkt sich ein erfolgreicher Angriff auf eine andere Komponente als die anfällige Komponente aus? Wenn dies der Fall ist, erhöht sich der Basiswert und die Vertraulichkeits-, Integritäts- und Authentifizierungsmetriken sollten relativ zur betroffenen Komponente bewertet werden.',
      S_U_Label:
        'Eine ausgenutzte Schwachstelle wirkt sich nur auf Ressourcen aus, die von derselben Sicherheitsautorität verwaltet werden. In diesem Fall sind die anfällige Komponente und die betroffene Komponente entweder identisch oder beide werden von derselben Sicherheitsautorität verwaltet.',
      S_C_Label:
        'Eine ausgenutzte Schwachstelle kann Ressourcen beeinträchtigen, die über den Zuständigkeitsbereich der Sicherheitsautorität, der anfälligen Komponente, hinaus geht. In diesem Fall sind die gefährdete Komponente und die betroffene Komponente unterschiedlich und werden von unterschiedlichen Sicherheitsautorität verwaltet.',
      C_Heading:
        'Diese Metrik beschreibt die Auswirkungen auf die Vertraulichkeit der von einer Softwarekomponente verwalteten Informationsressourcen aufgrund einer erfolgreich ausgenutzten Schwachstelle. Vertraulichkeit bezieht sich auf die Beschränkung des Zugriffs und der Offenlegung von Informationen auf nur autorisierte Benutzer sowie auf die Verhinderung des Zugriffs oder der Offenlegung gegenüber Unbefugten.',
      C_N_Label:
        'Es gibt keinen Verlust der Vertraulichkeit innerhalb der betroffenen Komponente.',
      C_L_Label:
        'Es gibt einen gewissen Verlust an Vertraulichkeit. Zugriff auf einige eingeschränkte Informationen sind möglich, aber der Angreifer hat keine Kontrolle darüber, welche Informationen erhalten werden, oder die Menge oder Art des Verlusts ist begrenzt. Die Offenlegung von Informationen verursacht keinen direkten, ernsthaften Schaden für die betroffene Komponente.',
      C_H_Label:
        'Es kommt zu einem vollständigen Verlust der Vertraulichkeit, was dazu führt, dass alle Informationen innerhalb der betroffenen Komponente an den Angreifer weitergegeben werden. Alternativ wird nur Zugang zu einigen eingeschränkten Informationen erlangt, aber die offengelegten Informationen haben eine direkte, schwerwiegende Auswirkung.',
      I_Heading:
        'Diese Metrik beschreibt die Auswirkung auf die Integrität einer erfolgreich ausgenutzten Schwachstelle. Integrität bezieht sich auf die Vertrauenswürdigkeit und Wahrhaftigkeit von Informationen.',
      I_N_Label:
        'Es gibt keinen Integritätsverlust innerhalb der betroffenen Komponente.',
      I_L_Label:
        'Die Änderung von Daten ist möglich, aber der Angreifer hat keine Kontrolle über die Folgen einer Änderung oder der Umfang der Änderung ist begrenzt. Die Datenänderung hat keine direkten, schwerwiegenden Auswirkungen auf die betroffene Komponente.',
      I_H_Label:
        'Es kommt zu einem totalen Integritätsverlust oder einem kompletten Schutzverlust. Beispielsweise ist der Angreifer in der Lage, beliebige/alle Dateien zu modifizieren, die von der betroffenen Komponente geschützt werden. Alternativ können nur einige Dateien geändert werden, aber eine böswillige Änderung würde eine direkte, schwerwiegende Konsequenz für die betroffene Komponente darstellen.',
      A_Heading:
        'Diese Metrik beschreibt die Auswirkung auf die Verfügbarkeit der betroffenen Komponente, die sich aus einer erfolgreich ausgenutzten Schwachstelle ergibt. Es bezieht sich auf den Verlust der Verfügbarkeit der betroffenen Komponente selbst, wie z. B. eines Netzwerkdienstes (z. B. Web, Datenbank, E-Mail). Da sich die Verfügbarkeit auf die Zugänglichkeit von Informationsressourcen bezieht, wirken sich Angriffe, die Netzwerkbandbreite, Prozessorzyklen oder Festplattenspeicher verbrauchen, alle auf die Verfügbarkeit einer betroffenen Komponente aus.',
      A_N_Label:
        'Es gibt keine Auswirkungen auf die Verfügbarkeit innerhalb der betroffenen Komponente.',
      A_L_Label:
        'Die Leistung wird reduziert oder es gibt Unterbrechungen in der Ressourcenverfügbarkeit. Auch wenn eine wiederholte Ausnutzung der Schwachstelle möglich ist, hat der Angreifer nicht die Möglichkeit, legitimen Benutzern den Dienst vollständig zu verweigern. Die Ressourcen in der betroffenen Komponente sind entweder die ganze Zeit teilweise verfügbar oder nur zeitweise vollständig verfügbar, aber insgesamt gibt es keine direkten, schwerwiegenden Folgen für die betroffene Komponente.',
      A_H_Label:
        'Es kommt zu einem vollständigen Verlust der Verfügbarkeit, was dazu führt, dass der Angreifer den Zugriff auf Ressourcen in der betroffenen Komponente vollständig verweigern kann; Dieser Verlust ist entweder anhaltend (während der Angreifer den Angriff fortsetzt) oder dauerhaft (der Zustand bleibt auch nach Abschluss des Angriffs bestehen). Alternativ hat der Angreifer die Möglichkeit, eine gewisse Verfügbarkeit zu verweigern, aber der Verlust der Verfügbarkeit stellt eine direkte, schwerwiegende Konsequenz für die betroffene Komponente dar (z. B. kann der Angreifer bestehende Verbindungen nicht unterbrechen, aber neue Verbindungen verhindern; der Angreifer kann eine Schwachstelle wiederholt ausnutzen die bei jedem erfolgreichen Angriff nur eine geringe Speichermenge verliert, aber nach wiederholter Ausnutzung dazu führt, dass ein Dienst vollständig nicht verfügbar ist).',
      temporalMetricGroup_Legend:
        'Die Temporal Metrik beschreibt den aktuellen Stand von Exploit-Techniken oder die Verfügbarkeit von Code, das Vorhandensein von Patches oder Workarounds oder das Vertrauen, das man in die Beschreibung einer Schwachstelle hat.',
      E_Heading:
        'Diese Metrik misst die Wahrscheinlichkeit, dass die Schwachstelle ausgenutzt wird, und basiert in der Regel auf dem aktuellen Stand der Exploit-Techniken, der Verfügbarkeit von Exploit-Code oder der aktiven „in-the-wild“-Ausnutzung.',
      E_X_Label:
        'Die Zuweisung dieses Werts weist darauf hin, dass nicht genügend Informationen vorhanden sind, um einen der anderen Werte auszuwählen, und hat keinen Einfluss auf den Temporal Score, d. h. es hat die gleiche Auswirkung auf die Bewertung wie der Wert „Hoch“.',
      E_U_Label:
        'Es ist kein Exploit-Code verfügbar oder ein Exploit ist nur theoretisch beschrieben.',
      E_P_Label:
        'Es ist lediglich Proof-of-Concept-Exploit-Code verfügbar oder eine Angriffsdemonstration ist für die meisten Systeme nicht praktikabel. Der Code oder die Technik ist nicht in allen Situationen funktionsfähig und erfordert möglicherweise erhebliche Änderungen durch einen erfahrenen Angreifer.',
      E_F_Label:
        'Funktionaler Exploit-Code ist verfügbar. Der Code funktioniert in den meisten Situationen, in denen die Schwachstelle vorhanden ist.',
      E_H_Label:
        'Funktionaler autonomer Code ist vorhanden oder es ist kein Exploit erforderlich (manueller Auslöser) und Details sind allgemein verfügbar. Der Exploit-Code funktioniert in jeder Situation oder wird aktiv über einen autonomen Agenten (z. B. einen Wurm oder Virus) verbreitet. Mit dem Netzwerk verbundene Systeme werden wahrscheinlich mit Scan- oder Ausnutzungsversuchen konfrontiert. Die Exploit-Entwicklung hat das Niveau zuverlässiger, weit verbreiteter und einfach zu verwendender automatisierter Tools erreicht.',
      RL_Heading:
        'Der Remediation Level einer Schwachstelle ist ein wichtiger Faktor für die Priorisierung. Die typische Schwachstelle ist bei der Erstveröffentlichung nicht gepatcht. Workarounds oder Hotfixes bieten möglicherweise eine vorläufige Behebung, bis ein offizieller Patch oder ein offizielles Upgrade herausgegeben wird. Jede dieser jeweiligen Phasen passt die zeitliche Punktzahl nach unten an, was die abnehmende Dringlichkeit widerspiegelt, wenn die Behebung endgültig wird.',
      RL_X_Label:
        'Die Zuweisung dieses Werts zeigt an, dass nicht genügend Informationen vorhanden sind, um einen der anderen Werte auszuwählen und hat keine Auswirkung auf den Temporal Score, d. h. es hat die gleiche Auswirkung auf die Bewertung wie die Zuweisung des Wertes „Nicht verfügbar“.',
      RL_O_Label:
        'Eine vollständige Anbieterlösung ist verfügbar. Entweder hat der Anbieter einen offiziellen Patch herausgegeben oder ein Upgrade ist verfügbar.',
      RL_T_Label:
        'Es gibt eine offizielle, aber temporäre Lösung. Dazu gehören Fälle, in denen der Anbieter einen temporären Hotfix, ein Tool oder einen Workaround herausgibt.',
      RL_W_Label:
        'Es gibt eine inoffizielle Lösung, die nicht vom Hersteller stammt. In einigen Fällen erstellen Benutzer der betroffenen Technologie einen eigenen Patch oder stellen Schritte bereit, um die Schwachstelle zu umgehen oder anderweitig zu mindern.',
      RL_U_Label:
        'Es ist entweder keine Lösung verfügbar oder die Anwendung ist nicht möglich.',
      RC_Heading:
        'Diese Metrik beschreibt den Grad des Vertrauens in die Existenz der Schwachstelle und die Glaubwürdigkeit der bekannten technischen Details. Teilweise wird nur die Existenz von Schwachstellen publiziert, jedoch ohne konkrete Details. Beispielsweise kann eine Auswirkung als unerwünscht erkannt werden, aber die eigentliche Ursache ist möglicherweise nicht bekannt. Die Schwachstelle kann später durch Forschungen bestätigt werden, die darauf hindeuten, wo die Schwachstelle liegen könnte, obwohl die Forschung möglicherweise nicht sicher ist. Schließlich kann eine Schwachstelle durch Bestätigung durch den Autor oder Anbieter der betroffenen Technologie bestätigt werden. Die Dringlichkeit einer Schwachstelle ist höher, wenn mit Sicherheit bekannt ist, dass eine Schwachstelle existiert. Diese Metrik gibt auch Aufschluss über das Maß an technischem Wissen, das potenziellen Angreifern zur Verfügung steht.',
      RC_X_Label:
        'Die Zuweisung dieses Werts weist darauf hin, dass nicht genügend Informationen vorhanden sind, um einen der anderen Werte auszuwählen, und hat keinen Einfluss auf den Temporal Score, d. h. es hat die gleiche Auswirkung auf die Bewertung wie die Zuweisung des Wert „Bestätigt“.',
      RC_U_Label:
        'Es gibt Berichte über Auswirkungen, die darauf hindeuten, dass eine Schwachstelle vorhanden ist. Die Berichte weisen darauf hin, dass die Ursache der Sicherheitsanfälligkeit nicht genau bekannt ist, oder die Berichte können sich in Bezug auf die Ursache oder die Auswirkungen der Sicherheitsanfälligkeit unterscheiden. Berichterstatter sind sich der wahren Natur der Schwachstelle nicht sicher, und es besteht wenig Vertrauen in die Gültigkeit der Berichte oder ob angesichts der beschriebenen Unterschiede ein statischer Basiswert angewendet werden kann. Ein Beispiel ist ein Fehlerbericht, der feststellt, dass ein zeitweiliger, aber nicht reproduzierbarer Absturz auftritt, mit Hinweisen auf eine Memory Corruption, die darauf hindeuten, dass ein Denial-of-Service oder möglicherweise schwerwiegendere Auswirkungen die Folge sein können.',
      RC_R_Label:
        'Signifikante Details werden veröffentlicht, aber die Forscher haben entweder kein volles Vertrauen in die Grundursache oder haben keinen Zugriff auf den Quellcode, um alle Wechselwirkungen, die zu dem Ergebnis führen können, vollständig zu bestätigen. Es besteht jedoch hinreichendes Vertrauen, dass der Fehler reproduzierbar ist und mindestens eine Auswirkung verifiziert werden kann (Proof-of-Concept-Exploits können dies liefern). Ein Beispiel ist eine detaillierte Beschreibung der Forschung zu einer Schwachstelle mit einer Erklärung (möglicherweise verschleiert oder „dem Leser als Übung überlassen“), die Zusicherungen gibt, wie die Ergebnisse reproduziert werden können.',
      RC_C_Label:
        'Es liegen detaillierte Berichte vor oder eine funktionale Reproduktion ist möglich (funktionale Exploits können dies bereitstellen). Der Quellcode ist verfügbar, um die Behauptungen der Forschung unabhängig zu überprüfen, oder der Autor oder Anbieter des betroffenen Codes hat das Vorhandensein der Schwachstelle bestätigt.',
      environmentalMetricGroup_Legend:
        'Diese Metriken ermöglichen es dem Analysten, den CVSS-Score abhängig von der Bedeutung des betroffenen IT-Assets für das Unternehmen eines Benutzers anzupassen, gemessen an vorhandenen ergänzenden/alternativen Sicherheitskontrollen, Vertraulichkeit, Integrität und Verfügbarkeit. Die Metriken sind das modifizierte Äquivalent der Basismetriken und ihnen werden Metrikwerte basierend auf der Komponentenplatzierung in der Organisationsinfrastruktur zugewiesen.',
      CR_Heading:
        'Diese Metriken ermöglichen es dem Analysten, den CVSS-Score abhängig von der Bedeutung der Vertraulichkeit des betroffenen IT-Assets für die Organisation eines Benutzers im Verhältnis zu anderen Auswirkungen anzupassen. Diese Metrik modifiziert den Environmental Score, indem die Auswirkungsmetrik „Modifizierte Vertraulichkeit“ gegenüber den anderen modifizierten Auswirkungsmetriken neu gewichtet wird.',
      CR_X_Label:
        'Die Zuweisung dieses Werts weist darauf hin, dass nicht genügend Informationen vorhanden sind, um einen der anderen Werte auszuwählen, und hat keinen Einfluss auf die Gesamtbewertung für Umgebung, d. h. es hat die gleiche Auswirkung auf die Bewertung wie die Zuweisung des Wertes „Mittel“.',
      CR_L_Label:
        'Der Verlust der Vertraulichkeit hat wahrscheinlich nur begrenzte nachteilige Auswirkungen auf die Organisation oder Personen, die mit der Organisation verbunden sind (z. B. Mitarbeiter, Kunden).',
      CR_M_Label:
        'Das Zuweisen dieses Werts zur Metrik hat keinen Einfluss auf die Punktzahl.',
      CR_H_Label:
        'Der Verlust der Vertraulichkeit hat wahrscheinlich katastrophale nachteilige Auswirkungen auf die Organisation oder Personen, die mit der Organisation verbunden sind (z. B. Mitarbeiter, Kunden).',
      IR_Heading:
        'Diese Metriken ermöglichen es dem Analysten, den CVSS-Score abhängig von der Bedeutung der Integrität des betroffenen IT-Assets für die Organisation eines Benutzers im Verhältnis zu anderen Auswirkungen anzupassen. Diese Metrik modifiziert den Environmental Score, indem die Auswirkungsmetrik der „Modifizierte Integrität“ gegenüber den anderen modifizierten Auswirkungen neu gewichtet wird.',
      IR_X_Label:
        'Die Zuweisung dieses Werts weist darauf hin, dass nicht genügend Informationen vorhanden sind, um einen der anderen Werte auszuwählen, und hat keinen Einfluss auf die Gesamtbewertung für die Umgebung, d. h. es hat die gleiche Auswirkung auf die Bewertung wie die Zuweisung von „Mittel“.',
      IR_L_Label:
        'Der Verlust der Integrität hat wahrscheinlich nur begrenzte nachteilige Auswirkungen auf die Organisation oder Personen, die mit der Organisation verbunden sind (z. B. Mitarbeiter, Kunden).',
      IR_M_Label:
        'Das Zuweisen dieses Werts zur Metrik hat keinen Einfluss auf die Punktzahl.',
      IR_H_Label:
        'Der Verlust der Integrität hat wahrscheinlich katastrophale nachteilige Auswirkungen auf die Organisation oder Personen, die mit der Organisation verbunden sind (z. B. Mitarbeiter, Kunden).',
      AR_Heading:
        'Diese Metriken ermöglichen es dem Analysten, den CVSS-Score abhängig von der Bedeutung der Verfügbarkeit des betroffenen IT-Assets für die Organisation eines Benutzers im Verhältnis zu anderen Auswirkungen anzupassen. Diese Metrik modifiziert den Environmental Score, indem die Auswirkungsmetrik „Modifizierte Verfügbarkeit“ gegenüber den anderen geänderten Auswirkungen neu gewichtet wird.',
      AR_X_Label:
        'Die Zuweisung dieses Werts weist darauf hin, dass nicht genügend Informationen vorhanden sind, um einen der anderen Werte auszuwählen, und hat keinen Einfluss auf die Gesamtbewertung für die Umgebung, d. h. es hat die gleiche Auswirkung auf die Bewertung wie die Zuweisung von „Mittel“.',
      AR_L_Label:
        'Der Verlust der Verfügbarkeit hat wahrscheinlich nur begrenzte nachteilige Auswirkungen auf die Organisation oder Personen, die mit der Organisation verbunden sind (z. B. Mitarbeiter, Kunden).',
      AR_M_Label:
        'Das Zuweisen dieses Werts zur Metrik hat keinen Einfluss auf die Punktzahl.',
      AR_H_Label:
        'Der Verlust der Verfügbarkeit hat wahrscheinlich katastrophale nachteilige Auswirkungen auf die Organisation oder Personen, die mit der Organisation verbunden sind (z. B. Mitarbeiter, Kunden).',
      MAV_Heading:
        'Diese Metrik spiegelt den Kontext wider, in dem die Ausnutzung von Schwachstellen möglich ist. Der Environmental Score erhöht sich, je entfernter (logisch und physisch) ein Angreifer sein kann, um die verwundbare Komponente auszunutzen.',
      MAV_X_Label:
        'Der der entsprechenden Basismetrik zugewiesene Wert wird verwendet.',
      MAV_N_Label:
        'Die verwundbare Komponente ist an den Netzwerkstack gebunden und die Menge möglicher Angreifer erstreckt sich über die anderen aufgeführten Optionen hinaus bis hin zum gesamten Internet. Eine solche Schwachstelle wird oft als „aus der Ferne ausnutzbar“ (remotely) bezeichnet und kann als Angriff betrachtet werden, der auf Protokollebene einen oder mehrere Netzwerksprünge entfernt ausnutzbar ist.',
      MAV_A_Label:
        'Die verwundbare Komponente ist an den Netzwerkstack gebunden, aber der Angriff ist auf Protokollebene auf eine logisch benachbarte Topologie beschränkt. Dies kann bedeuten, dass ein Angriff von demselben gemeinsam genutzten physischen (z. B. Bluetooth oder IEEE 802.11) oder logischen (z. B. lokales IP-Subnetz) Netzwerk oder von innerhalb einer sicheren oder anderweitig eingeschränkten Verwaltungsdomäne (z. B. MPLS, sicheres VPN) gestartet werden muss. .',
      MAV_L_Label:
        'Die verwundbare Komponente ist nicht an den Netzwerkstack gebunden und der Weg des Angreifers führt über Lese-/Schreib-/Ausführungsfunktionen. Entweder: Der Angreifer nutzt die Schwachstelle aus, indem er lokal (z. B. Tastatur, Konsole) oder remote (z. B. SSH) auf das Zielsystem zugreift; oder der Angreifer verlässt sich auf die Benutzerinteraktion einer anderen Person, um Aktionen auszuführen, die zum Ausnutzen der Schwachstelle erforderlich sind (z. B. einen legitimen Benutzer dazu verleiten, ein bösartiges Dokument zu öffnen).',
      MAV_P_Label:
        'Der Angriff erfordert, dass der Angreifer die verwundbare Komponente physisch berührt oder manipuliert. Die körperliche Interaktion kann kurz oder anhaltend sein.',
      MAC_Heading:
        'Diese Metrik beschreibt die Bedingungen, die außerhalb der Kontrolle des Angreifers liegen müssen, um die Schwachstelle auszunutzen. Solche Bedingungen können das Sammeln weiterer Informationen über das Ziel oder Berechnungsausnahmen erfordern. Die Bewertung dieser Metrik schließt jegliche Anforderungen an eine Benutzerinteraktion aus, um die Schwachstelle auszunutzen. Wenn eine bestimmte Konfiguration für einen erfolgreichen Angriff erforderlich ist, sollten die Basismetriken unter der Annahme bewertet werden, dass sich die anfällige Komponente in dieser Konfiguration befindet.',
      MAC_X_Label:
        'Der der entsprechenden Basismetrik zugewiesene Wert wird verwendet.',
      MAC_L_Label:
        'Besondere Zugangsbedingungen oder mildernde Umstände bestehen nicht. Ein Angreifer kann mit wiederholbarem Erfolg gegen die anfällige Komponente rechnen.',
      MAC_H_Label:
        'Ein erfolgreicher Angriff hängt von Bedingungen ab, die außerhalb der Kontrolle des Angreifers liegen. Das heißt, ein erfolgreicher Angriff kann nicht nach Belieben durchgeführt werden, sondern erfordert, dass der Angreifer einen messbaren Aufwand in die Vorbereitung oder Ausführung gegen die verwundbare Komponente investiert, bevor ein erfolgreicher Angriff erwartet werden kann. Zum Beispiel kann ein erfolgreicher Angriff erfordern, dass ein Angreifer: Wissen über die Umgebung sammelt, in der das verwundbare Ziel/die verwundbare Komponente vorhanden ist; Bereiten Sie die Zielumgebung vor, um die Exploit-Zuverlässigkeit zu verbessern; oder sich selbst in den logischen Netzwerkpfad zwischen dem Ziel und der vom Opfer angeforderten Ressource einschleusen, um die Netzwerkkommunikation zu lesen und/oder zu modifizieren (z. B. ein Man-in-the-Middle-Angriff).',
      MPR_Heading:
        'Diese Metrik beschreibt die Berechtigungsstufe, die ein Angreifer besitzen muss, bevor er die Schwachstelle erfolgreich ausnutzen kann.',
      MPR_X_Label:
        'Der der entsprechenden Basismetrik zugewiesene Wert wird verwendet.',
      MPR_N_Label:
        'Der Angreifer ist vor dem Angriff nicht autorisiert und benötigt daher keinen Zugriff auf Einstellungen oder Dateien, um einen Angriff durchzuführen.',
      MPR_L_Label:
        'Der Angreifer ist mit (für den Angriff erforderlichen) Privilegien autorisiert, die grundlegende Benutzerfunktionen bereitstellen, die normalerweise nur Einstellungen und Dateien betreffen, die einem Benutzer gehören. Alternativ kann ein Angreifer mit niedrigen Rechten möglicherweise nur Auswirkungen auf nicht vertrauliche Ressourcen haben.',
      MPR_H_Label:
        'Der Angreifer ist mit (für den Angriff erforderlichen) Privilegien autorisiert, die eine erhebliche (z. B. administrative) Kontrolle über die anfällige Komponente bieten, die sich auf komponentenweite Einstellungen und Dateien auswirken könnte.',
      MUI_Heading:
        'Diese Metrik beschreibt die Voraussetzungen in wie weit sich ein anderer Benutzer als den Angreifer, sich an einer erfolgreichen Kompromittierung der anfälligen Komponente beteiligen muss. Diese Metrik bestimmt, ob die Schwachstelle nur nach Belieben des Angreifers ausgenutzt werden kann oder ob ein separater Benutzer (oder ein vom Benutzer initiierter Prozess) in irgendeiner Weise daran teilnehmen muss.',
      MUI_X_Label:
        'Der der entsprechenden Basismetrik zugewiesene Wert wird verwendet.',
      MUI_N_Label:
        'Das anfällige System kann ohne Interaktion eines Benutzers ausgenutzt werden.',
      MUI_R_Label:
        'Die erfolgreiche Ausnutzung dieser Schwachstelle erfordert, dass ein Benutzer einige Maßnahmen ergreift, bevor die Schwachstelle ausgenutzt werden kann.',
      MS_Heading:
        'Wirkt sich ein erfolgreicher Angriff auf eine andere Komponente als die anfällige Komponente aus? Wenn dies der Fall ist, erhöht sich der Basiswert und die Vertraulichkeits-, Integritäts- und Authentifizierungsmetriken sollten relativ zur betroffenen Komponente bewertet werden.',
      MS_X_Label:
        'Der der entsprechenden Basismetrik zugewiesene Wert wird verwendet.',
      MS_U_Label:
        'Eine ausgenutzte Schwachstelle wirkt sich nur auf Ressourcen aus, die von derselben Sicherheitsautorität verwaltet werden. In diesem Fall sind die anfällige Komponente und die betroffene Komponente entweder identisch oder beide werden von derselben Sicherheitsautorität verwaltet.',
      MS_C_Label:
        'Eine ausgenutzte Schwachstelle kann Ressourcen beeinträchtigen, die über den Zuständigkeitsbereich der Sicherheitsautorität, der anfälligen Komponente, hinaus geht. In diesem Fall sind die gefährdete Komponente und die betroffene Komponente unterschiedlich und werden von unterschiedlichen Sicherheitsautorität verwaltet.',
      MC_Heading:
        'Diese Metrik beschreibt die Auswirkungen auf die Vertraulichkeit der von einer Softwarekomponente verwalteten Informationsressourcen aufgrund einer erfolgreich ausgenutzten Schwachstelle. Vertraulichkeit bezieht sich auf die Beschränkung des Zugriffs und der Offenlegung von Informationen auf nur autorisierte Benutzer sowie auf die Verhinderung des Zugriffs oder der Offenlegung gegenüber Unbefugten.',
      MC_X_Label:
        'Der der entsprechenden Basismetrik zugewiesene Wert wird verwendet.',
      MC_N_Label:
        'Es gibt keinen Verlust der Vertraulichkeit innerhalb der betroffenen Komponente.',
      MC_L_Label:
        'Es gibt einen gewissen Verlust an Vertraulichkeit. Es wird Zugriff auf einige eingeschränkte Informationen erhalten, aber der Angreifer hat keine Kontrolle darüber, welche Informationen erhalten werden, oder die Menge oder Art des Verlusts ist begrenzt. Die Offenlegung von Informationen verursacht keinen direkten, ernsthaften Schaden für die betroffene Komponente.',
      MC_H_Label:
        'Es kommt zu einem vollständigen Verlust der Vertraulichkeit, was dazu führt, dass alle Ressourcen innerhalb der betroffenen Komponente an den Angreifer weitergegeben werden. Alternativ wird nur Zugang zu einigen eingeschränkten Informationen erlangt, aber die offengelegten Informationen haben eine direkte, schwerwiegende Auswirkung.',
      MI_Heading:
        'Diese Metrik beschreibt die Auswirkung auf die Integrität einer erfolgreich ausgenutzten Schwachstelle. Integrität bezieht sich auf die Vertrauenswürdigkeit und Wahrhaftigkeit von Informationen.',
      MI_X_Label:
        'Der der entsprechenden Basismetrik zugewiesene Wert wird verwendet.',
      MI_N_Label:
        'Es gibt keinen Integritätsverlust innerhalb der betroffenen Komponente.',
      MI_L_Label:
        'Die Änderung von Daten ist möglich, aber der Angreifer hat keine Kontrolle über die Folgen einer Änderung oder der Umfang der Änderung ist begrenzt. Die Datenänderung hat keine direkten, schwerwiegenden Auswirkungen auf die betroffene Komponente.',
      MI_H_Label:
        'Es kommt zu einem totalen Integritätsverlust oder einem kompletten Schutzverlust. Beispielsweise ist der Angreifer in der Lage, beliebige/alle Dateien zu modifizieren, die von der betroffenen Komponente geschützt werden. Alternativ können nur einige Dateien geändert werden, aber eine böswillige Änderung würde eine direkte, schwerwiegende Konsequenz für die betroffene Komponente darstellen.',
      MA_Heading:
        'Diese Metrik misst die Auswirkung auf die Verfügbarkeit der betroffenen Komponente, die sich aus einer erfolgreich ausgenutzten Schwachstelle ergibt. Es bezieht sich auf den Verlust der Verfügbarkeit der betroffenen Komponente selbst, wie z. B. eines Netzwerkdienstes (z. B. Web, Datenbank, E-Mail). Da sich die Verfügbarkeit auf die Zugänglichkeit von Informationsressourcen bezieht, wirken sich Angriffe, die Netzwerkbandbreite, Prozessorzyklen oder Festplattenspeicher verbrauchen, alle auf die Verfügbarkeit einer betroffenen Komponente aus.',
      MA_X_Label:
        'Der der entsprechenden Basismetrik zugewiesene Wert wird verwendet.',
      MA_N_Label:
        'Es gibt keine Auswirkungen auf die Verfügbarkeit innerhalb der betroffenen Komponente.',
      MA_L_Label:
        'Die Leistung wird reduziert oder es gibt Unterbrechungen in der Ressourcenverfügbarkeit. Auch wenn eine wiederholte Ausnutzung der Schwachstelle möglich ist, hat der Angreifer nicht die Möglichkeit, legitimen Benutzern den Dienst vollständig zu verweigern. Die Ressourcen in der betroffenen Komponente sind entweder die ganze Zeit teilweise verfügbar oder nur zeitweise vollständig verfügbar, aber insgesamt gibt es keine direkten, schwerwiegenden Folgen für die betroffene Komponente.',
      MA_H_Label:
        'Es kommt zu einem vollständigen Verlust der Verfügbarkeit, was dazu führt, dass der Angreifer den Zugriff auf Ressourcen in der betroffenen Komponente vollständig verweigern kann; Dieser Verlust ist entweder anhaltend (während der Angreifer den Angriff fortsetzt) oder dauerhaft (der Zustand bleibt auch nach Abschluss des Angriffs bestehen). Alternativ hat der Angreifer die Möglichkeit, eine gewisse Verfügbarkeit zu verweigern, aber der Verlust der Verfügbarkeit stellt eine direkte, schwerwiegende Konsequenz für die betroffene Komponente dar (z. B. kann der Angreifer bestehende Verbindungen nicht unterbrechen, aber neue Verbindungen verhindern; der Angreifer kann eine Schwachstelle wiederholt ausnutzen die bei jedem erfolgreichen Angriff nur eine geringe Speichermenge verliert, aber nach wiederholter Ausnutzung dazu führt, dass ein Dienst vollständig nicht verfügbar ist).',
    },
  },
  registerFirstUser: 'Ersten Benutzer anlegen',
  customData: 'Benutzerdefinierte Daten',
  custom: 'Custom',
  settings: 'Einstellungen',
  profile: 'Profil',
  logout: 'Abmelden',
  login: 'Anmelden',
  username: 'Benutzername',
  password: 'Passwort',
  noLanguage: 'Keine Sprachen definiert. Bitte erstellen Sie Sprachen in ',
  noAudit: 'Keine Audit-Typen definiert. Bitte erstellen Sie Audit-Typen in ',
  auditTypes: 'Audit-Typen',
  searchFinds: 'Ergebnisse durchsuchen',
  myAudits: 'Meine Audits',
  usersConnected: 'Benutzer verbunden',
  awaitingMyReview: 'Warten auf Überprüfung durch mich',
  newAudit: 'Neues Audit',
  search: 'Suche',
  users: 'Benutzer',
  auditNum1: 'Audit',
  auditNums: 'Audits',
  resultsPerPage: 'Ergebnisse pro Seite:',
  createAudit: 'Audit erstellen',
  name: 'Name',
  selectAssessment: 'Testtyp auswählen',
  selectLanguage: 'Sprache auswählen',
  participants: 'Teilnehmer',
  language: 'Sprache',
  company: 'Firma',
  companies: 'Firmen',
  date: 'Datum',
  sections: 'Abschnitte',
  generalInformation: 'Allgemeine Informationen',
  networkScan: 'Netzwerkscan',
  findings: 'Ergebnisse',
  automaticSorting: 'Automatische Sortierung',
  sortBy: 'Sortieren nach',
  sortOrder: 'Sortierreihenfolge',
  ascending: 'Aufsteigend',
  descending: 'Absteigend',
  me: 'ich',
  cvssScore: 'CVSS Score',
  cvssTemporalScore: 'CVSS Temporal Score',
  cvssEnvironmentalScore: 'CVSS Environmental Score',
  priority: 'Priorität',
  remediation: 'Empfehlung',
  remediationDifficulty: 'Schwierigkeit der Empfehlung',
  remediationComplexity: 'Komplexität der Empfehlung',
  remediationPriority: 'Priorität der Empfehlung',
  easy: 'Leicht',
  medium: 'Mittel',
  complex: 'Komplex',
  low: 'Niedrig',
  high: 'Hoch',
  urgent: 'Dringend',
  title: 'Titel',
  category: 'Kategorie',
  selectCategory: 'Kategorie auswählen',
  noCategory: 'Keine Kategorie',
  vulnType: 'Typ',
  undefined: 'Undefiniert',
  vulnerabilityNum1: 'Schwachstelle',
  vulnerabilitiesNums: 'Schwachstellen',
  definition: 'Definition',
  proofs: 'Beweis',
  details: 'Details',
  completed: 'Vollständig',
  type: 'Type',
  description: 'Beschreibung',
  observation: 'Beobachtung',
  references: 'Referenzen (eine pro Zeile)',
  customFields: 'Benutzerdefinierte Felder',
  affectedAssets: 'Betroffene Assets',
  courseOfActions: 'Vorgehensweise',
  template: 'Vorlage',
  client: 'Kunde',
  reviewers: 'Prüfer',
  collaborator: 'Mitarbeiter',
  collaborators: 'Mitarbeiter',
  startDate: 'Startdatum',
  endDate: 'Enddatum',
  reportingDate: 'Berichtsdatum',
  auditScope: 'Geltungsbereich (einer pro Zeile)',
  import: 'Import',
  export: 'Export',
  hostsAssociateScopes: 'Importierte Hosts mit Geltungsbereichen assoziieren',
  handleCustomData: 'Handle Custom Data',
  clients: 'Kunden',
  templates: 'Vorlagen',
  addClient: 'Kunde hinzufügen',
  editClient: 'Kunde bearbeiten',
  firstname: 'Vorname',
  lastname: 'Nachname',
  email: 'E-Mail',
  function: 'Funktion',
  phone: 'Telefon',
  cell: 'Mobiltelefon',
  role: 'Rolle',
  collatorator: 'Mitarbeiter',
  addCollaborator: 'Mitarbeiter hinzufügen',
  editCollaborator: 'Mitarbeiter bearbeiten',
  addCompany: 'Firma hinzufügen',
  editCompany: 'Firma bearbeiten',
  logo: 'Logo',
  quantifier: '',
  languages: 'Sprachen',
  extension: 'Erweiterung',
  createTemplate: 'Vorlage erstellen',
  file: 'Datei',
  editTemplate: 'Vorlage bearbeiten',
  importVulnerabilities: 'Schwachstellen importieren',
  importVulnerabilitiesInfo: `Schwachstellen aus .yml- oder .json-Datei importieren. (Serpico-Format wird akzeptiert)<br />
    Dies erlaubt es Ihnen einfach eine Reihe von Schwachstellenvorlagen zu importieren.`,
  importVulnerabilitiesOk:
    'Alle <strong>{0}</strong> Schwachstellen wurden erstellt',
  importVulnerabilitiesAllExists:
    'Alle <strong>{0}</strong> Schwachstellentitel existieren bereits',
  importVulnerabilitiesPartial:
    '<strong>{0}</strong> Schwachstellen wurden erstellt<br /><strong>{1}</strong> Schwachstellentitel existieren bereits',
  exportVulnerabilities: 'Schwachstellen exportieren',
  exportVulnerabilitiesInfo: `Exportiert Schwachstellen im yaml-Format. Dieser Export kann später einfach wieder zurück-importiert werden`,
  deleteAllVulnerabilities: 'Alle Schwachstellen löschen',
  deleteAllVulnerabilitiesInfo: `Löscht alle existierende Schwachstellen.<br />
    <strong>Diese Aktion ist unwiderruflich!!</strong>`,
  customSections: 'Eigene Abschnitte',
  listOfLanguages: 'Liste der Sprachen',
  editLanguages: 'Sprache bearbeiten',
  locale: 'Locale',
  auditTypesUsedInAudits: 'Audit-Typen die in Audits genutzt werden',
  languageUsedInAuditsAndVuls:
    'Sprachen die in Audits und Schwachstellen genutzt werden',
  addSections: 'Abschnitt hinzufügen',
  hideBuiltInSections: 'Vorgefertigte Abschnitte ausblenden',
  listOfAuditTypes: 'Liste der Audit-Typen',
  editAuditTypes: 'Audit-Typen bearbeiten',
  createAtLeastOneLanguage: 'Bitte erstellen Sie mindestens eine Sprache',
  createVulnerabilityTypes:
    'Schwachstellentypen erstellen, welche in Schwachstellen und Ergebnissen genutzt werden',
  vulnerabilityTypesList: 'Liste der Schwachstellentypen',
  editVulnerabilityTypes: 'Schwachstellentypen bearbeiten',
  createVulnerabilityCategories:
    'Schwachstellenkategorien erstellen, welche in Schwachstellen und Ergebnissen genutzt werden',
  defaultSortingOptions: 'Standardsortieroptionen',
  listOfCategories: 'Liste der Kategorien',
  editCategories: 'Kategorien bearbeiten',
  createAndManageCustomFields:
    'Benutzerdefinierte Felder für verschiedene Ansichten erstellen und verwalten',
  selectView: 'Ansicht auswählen',
  selectSection: 'Abschnitt auswählen',
  selectComponent: 'Komponente auswählen',
  label: 'Label',
  size: 'Größe',
  offset: 'Offset',
  required: 'Benötigt',
  optionsLanguage: 'Sprache der Option',
  addOption: 'Option hinzufügen',
  languageForDefaultText: 'Sprache (für Standardtext)',
  createCustomSections: 'Benutzerdefinierte Abschnitte für Audits erstellen',
  fieldForTemplate: 'Feld (für Vorlage)',
  customIcon: 'Icon (Material/Font Awesome)',
  field: 'Feld',
  editSections: 'Abschnitt bearbeiten',
  vulnerabilityTypes: 'Schwachstellentypen',
  vulnerabilityCategories: 'Schwachstellenkategorien',
  auditGeneral: 'Audit allgemein',
  auditFinding: 'Auditergebnisse',
  auditSection: 'Auditabschnitte',
  vulnerability: 'Vulnerability',
  checkbox: 'Checkbox',
  editor: 'Editor',
  input: 'Eingabe',
  radio: 'Radio',
  select: 'Auswahl',
  selectMultiple: 'Mehrfachauswahl',
  space: 'Space',
  updateUserInformation: 'Benutzerinformationen aktualisieren',
  newPassword: 'Neues Passwort',
  confirmPassword: 'Passwort bestätigen',
  currentPassword: 'Aktuelles Passwort *',
  reports: 'Berichte',
  reportsImagesBorder: 'Bilderrahmen im Bericht',
  addBorderToImages:
    'Fügt Bildern in generierten Berichten einen Rahmen hinzu.',
  currentColor: 'Aktuelle Farbe',
  cvssColors: 'CVSS-Farben',
  changeCvssColorsDescription:
    'Ändert die Farben, welche den unterschiedlichen CVSS-Schweregraden im Bericht zugeordnet sind.',
  critical: 'Kritisch',
  informational: 'Informativ',
  reviews: 'Überprüfungen',
  auditUpdateAfterApproval: 'Audit-Aktualisierung nach Freigabe',
  changeApproveBehaviorIfAuditUpdated:
    'Ändert das Verhalten für ein freigegebenes Audit, welches aktualisiert wird. Wenn ein Audit aktualisiert wird : ',
  removeAllPriorApprovals: 'Werden alle voherigen Freigaben entfernt.',
  keepAllPriorApprovals: 'Werden alle voherigen Freigaben beibehalten.',
  mandatoryReview: 'Verpflichtende Überprüfung',
  mandatoryReviewInfo: `Macht den Überprüfungsprozess verpflichtend. Wenn diese Option gewählt ist, kann ein Benutzer ein Audit nicht exportieren, bevor es nicht von der geforderten Anzahl von Überprüfern freigegeben wurde. 
    <br/>Die minimale Anzahl an Überprüfern wird ebenfalls genutzt, um festzulegen, ob ein Bericht als freigegeben markiert wird.`,
  minimalNumberOfReviewers: 'Minimale Anzahl an Überprüfern',
  saveSettings: 'Einstellungen speichern',
  revertSettingsToDefaults: 'Einstellung auf Standardwerte zurücksetzen',
  importSettings: 'Einstellungen importieren',
  exportSettings: 'Einstellungen exportieren',
  mergeVulnerabilities: 'Schwachstellen zusammenführen',
  mergeVulnerabilitiesInfo: `Das Ziel ist es, unterschiedliche Schwachstellen in verschiedenen Sprachen in eine einzelne Schwachstelle zusammenzuführen. <br />
    Dafür müssen mindestens 2 Sprachen existieren.`,
  newVulnerability: 'Neue Schwachstelle',
  total: 'Gesamt',
  addVulnerability: 'Schwachstelle hinzufügen',
  editVulnerability: 'Schwachstelle bearbeiten',
  changeCategory: 'Kategorie ändern',
  listOfSections: 'List der Abschnitte',
  updateVulnerability: 'Schwachstelle aktualisieren',
  current: 'Aktuell',
  languageAddFromRight: 'Sprache (von rechts hinzufügen)',
  languageMoveToLeft: 'Sprache (nach Links verschieben)',
  merge: 'Zusammenführen',
  goBack: 'Gehe zurück',
  twoStepVerification: '2-Stufige-Verifizierung',
  twoStepVerificationMessage:
    'Öffnen Sie Ihre Authentifizierungs-App und geben Sie den angezeigten Sicherheitscode ein.',
  captions: 'Beschriftungen',
  captionsDescription:
    "Fügt Beschriftungslabel hinzu, welche im Bericht genutzt werden (Standard ist 'Abbildung')",
};
