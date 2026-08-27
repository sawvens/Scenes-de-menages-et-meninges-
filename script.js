/* ============================================================
   LE DÉBAT DU JOUR
   Tout tourne en local dans le navigateur. Seule la récupération
   des titres d'actu (RSS2JSON) part vers l'extérieur.
   ============================================================ */

const CATEGORIES = {
  societe:    "Société & actu",
  politique:  "Politique & valeurs",
  argent:     "Argent & finances",
  travail:    "Travail & carrière",
  maison:     "Maison & quotidien",
  enfants:    "Enfants & éducation",
  famille:    "Belle-famille",
  ecologie:   "Écologie",
  numerique:  "Numérique & réseaux",
  technologie:"Technologie & IA",
  couple:     "Couple & habitudes",
  intimite:   "Intimité & complicité",
  vacances:   "Vacances & loisirs",
  culture:    "Culture & sorties",
  sport:      "Sport",
  alimentation:"Alimentation",
  animaux:    "Animaux de compagnie",
  sante:      "Santé & bien-être",
  spiritualite:"Croyances & spiritualité",
  apparence:  "Apparence & image de soi",
  voisinage:  "Vie sociale & voisinage",
  avenir:     "Projets d'avenir",
};

/* ---------- 1. Banque locale de sujets (toujours disponible) ---------- */
const BANK = [
  // Argent & finances
  {c:"argent", q:"Compte joint, comptes séparés ou un peu des deux : votre système actuel est-il vraiment le bon ?"},
  {c:"argent", q:"Si l'un de vous gagnait deux fois plus que l'autre, les dépenses communes devraient-elles rester 50/50 ?"},
  {c:"argent", q:"Un gros achat en solo sans en parler à l'autre : à partir de quel montant ça pose problème ?"},
  {c:"argent", q:"Faut-il se fixer un budget « plaisir » individuel que l'autre n'a pas à valider ?"},
  {c:"argent", q:"Épargner pour un projet lointain ou profiter davantage maintenant : où mettez-vous le curseur ?"},
  {c:"argent", q:"Prêter de l'argent à sa famille sans consulter l'autre : oui ou non ?"},
  {c:"argent", q:"Faut-il tout se dire sur ses dettes et crédits en cours, dès le début d'une relation ?"},
  {c:"argent", q:"Investir en bourse ou dans la pierre avec l'argent du couple : qui devrait décider ?"},
  {c:"argent", q:"Payer systématiquement chacun son tour au restaurant : juste, ou source de comptes d'apothicaire ?",},
  {c:"argent", q:"Un héritage reçu par l'un de vous : ça appartient au couple ou ça reste personnel ?"},

  // Travail & carrière
  {c:"travail", q:"Refuser une promotion qui impliquerait de déménager loin de l'autre : ça se discute ou c'est non négociable ?"},
  {c:"travail", q:"Ramener ses problèmes de boulot à la maison tous les soirs : jusqu'où c'est acceptable ?"},
  {c:"travail", q:"L'un de vous devrait-il mettre sa carrière entre parenthèses pour les enfants, et si oui, lequel ?"},
  {c:"travail", q:"Travailler avec son/sa conjoint(e) dans la même entreprise : bonne ou mauvaise idée ?"},
  {c:"travail", q:"Le télétravail a-t-il changé, en bien ou en mal, l'équilibre de votre couple ?"},
  {c:"travail", q:"Un collègue proche du sexe qui vous attire : faut-il le dire à l'autre par transparence ?"},
  {c:"travail", q:"Changer complètement de métier à 40 ans pour un rêve : vous soutiendriez l'autre à fond ?"},

  // Maison & quotidien
  {c:"maison", q:"La répartition des tâches ménagères chez vous : équitable, ou seulement en apparence ?"},
  {c:"maison", q:"Faut-il un planning écrit des tâches, ou ça tue le naturel du couple ?"},
  {c:"maison", q:"Qui décide vraiment de la déco : est-ce un choix à deux ou un goût qui domine l'autre ?"},
  {c:"maison", q:"Le désordre de l'un est-il un manque de respect pour l'autre, ou juste une différence de nature ?"},
  {c:"maison", q:"Faire appel à quelqu'un pour le ménage : un luxe justifié ou un aveu qu'on n'y arrive pas ensemble ?"},
  {c:"maison", q:"Qui doit gérer les corvées « invisibles » (rendez-vous, papiers administratifs, courses) chez vous ?"},
  {c:"maison", q:"Louer ou acheter votre logement : sur quels critères devriez-vous vraiment trancher ?"},
  {c:"maison", q:"Vivre en ville ou à la campagne : lequel de vous deux devrait faire le plus de concessions ?"},

  // Enfants & éducation
  {c:"enfants", q:"Fessée, cri, dialogue : sur quelle méthode d'éducation n'êtes-vous pas alignés ?"},
  {c:"enfants", q:"L'âge du premier téléphone pour un enfant : vous êtes d'accord ou pas du tout ?"},
  {c:"enfants", q:"École publique ou privée : le choix devrait se faire sur quels critères en priorité ?"},
  {c:"enfants", q:"Qui doit gérer les devoirs le soir, et est-ce vraiment réparti équitablement ?"},
  {c:"enfants", q:"Avoir un enfant de plus : un vrai sujet ouvert entre vous, ou déjà tranché sans le dire ?"},
  {c:"enfants", q:"Faut-il donner de l'argent de poche, et à partir de quel âge ?"},
  {c:"enfants", q:"Se disputer devant les enfants : totalement interdit, ou ça leur apprend aussi quelque chose ?"},
  {c:"enfants", q:"Transmettre sa propre religion ou culture aux enfants : un devoir ou un choix à leur laisser plus tard ?"},

  // Écologie
  {c:"ecologie", q:"Reprendre l'avion pour les vacances alors qu'on se dit sensibles à l'écologie : contradiction ou pas grave ?"},
  {c:"ecologie", q:"Le tri des déchets chez vous : rigoureux des deux côtés, ou un seul y croit vraiment ?"},
  {c:"ecologie", q:"Manger moins de viande pour l'environnement : un effort que vous êtes prêts à faire ensemble ?"},
  {c:"ecologie", q:"Acheter d'occasion par défaut ou neuf par confort : où en êtes-vous chacun ?"},
  {c:"ecologie", q:"Passer à la voiture électrique malgré le prix : un choix qui vous diviserait ou pas ?"},
  {c:"ecologie", q:"Culpabiliser l'autre pour ses écarts écologiques : ça aide, ou ça braque ?"},

  // Numérique & réseaux
  {c:"numerique", q:"Le téléphone à table : tolérance zéro ou ça dépend des soirs ?"},
  {c:"numerique", q:"Faut-il tout se montrer sur son téléphone, ou chacun a droit à un jardin secret numérique ?"},
  {c:"numerique", q:"Publier des photos de couple ou de vos enfants sur les réseaux : jusqu'où c'est acceptable ?"},
  {c:"numerique", q:"Suivre l'ex de l'autre sur les réseaux sociaux : anodin ou pas net ?"},
  {c:"numerique", q:"Un soir « sans écran » imposé dans le couple : bonne idée ou fausse bonne idée ?"},
  {c:"numerique", q:"Liker les photos d'inconnu(e)s attirant(e)s sur les réseaux : de la trahison ou rien du tout ?"},
  {c:"numerique", q:"Passer plus de temps sur son téléphone qu'avec l'autre le soir : vous vous sentez concernés ?"},

  // Technologie & IA
  {c:"technologie", q:"Utiliser l'IA pour rédiger un message important à l'autre : romantique quand même, ou ça enlève tout le charme ?"},
  {c:"technologie", q:"Confier des décisions du quotidien à une IA (budget, organisation) : ça vous rassure ou ça vous inquiète ?"},
  {c:"technologie", q:"Un robot ou une IA qui ferait le ménage à votre place : ça changerait vraiment votre équilibre de couple ?"},
  {c:"technologie", q:"Les voitures autonomes partout d'ici dix ans : vous y feriez confiance, tous les deux ?"},

  // Couple & habitudes
  {c:"couple", q:"La jalousie dans un couple : un signe d'amour ou un problème à régler ?"},
  {c:"couple", q:"Avoir des ami(e)s du sexe opposé très proches : ça vous dérange, l'un ou l'autre ?"},
  {c:"couple", q:"Un soir par semaine sans l'autre, entre amis : nécessaire à l'équilibre ou source de distance ?"},
  {c:"couple", q:"Se dire vraiment tout, y compris ce qui blesse : est-ce un idéal ou une erreur ?"},
  {c:"couple", q:"Qui a initié le dernier compromis important du couple, et était-ce équilibré ?"},
  {c:"couple", q:"Les habitudes qu'on gardait « avant lui/elle » : lesquelles avez-vous dû sacrifier, et était-ce juste ?"},
  {c:"couple", q:"Fêter son anniversaire de couple chaque année : indispensable, ou juste une pression marketing ?"},
  {c:"couple", q:"Se faire des surprises encore aujourd'hui : est-ce que l'un de vous s'y investit plus que l'autre ?"},
  {c:"couple", q:"Le mariage change-t-il vraiment quelque chose entre deux personnes qui s'aiment déjà ?"},

  // Intimité & complicité
  {c:"intimite", q:"Parler ouvertement de ses envies et de ce qui vous plaît : facile ou encore un peu tabou chez vous ?"},
  {c:"intimite", q:"La routine qui s'installe avec le temps : un sujet que vous osez aborder à deux ?"},
  {c:"intimite", q:"Les compliments physiques au quotidien : vous en donnez assez à l'autre, selon vous ?"},
  {c:"intimite", q:"Garder des rituels de couple (date night, gestes tendres) malgré le quotidien chargé : vous y arrivez vraiment ?"},

  // Vacances & loisirs
  {c:"vacances", q:"Vacances organisées au jour le jour ou tout planifié à l'avance : quel camp êtes-vous chacun ?"},
  {c:"vacances", q:"Partir en vacances sans l'autre, entre amis : un non-sujet ou une vraie question ?"},
  {c:"vacances", q:"Le budget vacances : faut-il se fixer un plafond commun ou chacun gère sa part ?"},
  {c:"vacances", q:"Retourner toujours au même endroit ou découvrir un nouveau pays chaque année : vous êtes d'accord ?"},
  {c:"vacances", q:"Un hobby que l'un pratique sans l'autre : ça doit rester personnel, ou l'autre devrait s'y intéresser un peu ?"},

  // Culture & sorties
  {c:"culture", q:"Sortir voir un film ou une expo qui n'intéresse que l'un de vous : par obligation ou par plaisir partagé ?"},
  {c:"culture", q:"Avoir des goûts musicaux totalement opposés : ça pose vraiment problème au quotidien ?"},
  {c:"culture", q:"Lire le même livre en même temps pour en parler ensemble : une bonne idée à essayer ?"},

  // Sport
  {c:"sport", q:"Le sport et l'alimentation : est-ce que l'un pousse trop l'autre, ou pas assez ?"},
  {c:"sport", q:"S'entraîner ensemble ou chacun de son côté : qu'est-ce qui marche vraiment pour vous ?"},
  {c:"sport", q:"Un des deux qui devient très compétitif en sport : ça crée de la tension ou de l'admiration ?"},

  // Alimentation
  {c:"alimentation", q:"Un des deux devient végétarien : l'autre doit-il s'adapter à la maison ?"},
  {c:"alimentation", q:"Qui cuisine le plus souvent chez vous, et est-ce vraiment un choix ou une habitude subie ?"},
  {c:"alimentation", q:"Commander à manger plusieurs fois par semaine : un plaisir assumé ou une facilité à limiter ?"},

  // Animaux de compagnie
  {c:"animaux", q:"Prendre un animal de compagnie : qui devrait s'en occuper au quotidien, en vrai ?"},
  {c:"animaux", q:"Laisser l'animal dormir dans le lit du couple : ça vous va à tous les deux ?"},
  {c:"animaux", q:"Dépenser beaucoup pour la santé d'un animal de compagnie : jusqu'où c'est raisonnable ?"},

  // Santé & bien-être
  {c:"sante", q:"La charge mentale liée à la santé de la famille (rendez-vous, suivis) : bien répartie chez vous ?"},
  {c:"sante", q:"Prendre du temps pour soi (sport, sorties entre amis) sans culpabiliser : vous y arrivez tous les deux ?"},
  {c:"sante", q:"Encourager l'autre à consulter quand il ou elle ne va pas bien : facile à faire sans que ça braque ?"},
  {c:"sante", q:"Le sommeil décalé de l'un qui dérange l'autre : faut-il faire chambre à part parfois ?"},

  // Croyances & spiritualité
  {c:"spiritualite", q:"Croire en quelque chose de différent (ou pas du tout) : est-ce que ça a une place dans votre couple ?"},
  {c:"spiritualite", q:"Se marier religieusement même sans grande conviction : pour la famille, ou par cohérence personnelle ?"},
  {c:"spiritualite", q:"Fêter des fêtes religieuses par tradition plus que par foi : vous trouvez ça sincère ou pas ?"},

  // Apparence & image de soi
  {c:"apparence", q:"Donner son avis franc sur une tenue qui ne plaît pas : honnêteté totale ou petit mensonge gentil ?"},
  {c:"apparence", q:"Un changement radical de look de l'autre (coupe, style) sans le prévenir : ça vous dérangerait ?"},
  {c:"apparence", q:"La chirurgie esthétique pour se sentir mieux : un sujet que vous pourriez soutenir chez l'autre ?"},

  // Vie sociale & voisinage
  {c:"voisinage", q:"Un voisin bruyant ou envahissant : qui devrait aller lui parler, dans votre couple ?"},
  {c:"voisinage", q:"Inviter des amis à la dernière minute sans prévenir l'autre : ça passe ou ça casse ?"},
  {c:"voisinage", q:"Garder des amis qui critiquent régulièrement votre couple : vous en parleriez ensemble ?"},

  // Belle-famille
  {c:"famille", q:"Les fêtes de fin d'année : moitié-moitié entre les deux familles, ou ça penche toujours du même côté ?"},
  {c:"famille", q:"Un conseil non demandé de la belle-famille sur l'éducation des enfants : comment on réagit ?"},
  {c:"famille", q:"À quelle fréquence voir sa belle-famille est-il « raisonnable » pour vous deux ?"},
  {c:"famille", q:"Prendre parti pour sa propre famille en cas de désaccord avec la belle-famille : automatique chez vous ?"},

  // Projets d'avenir
  {c:"avenir", q:"Où voyez-vous votre couple dans dix ans, très concrètement ? Vos réponses seraient-elles proches ?"},
  {c:"avenir", q:"Déménager dans une autre région ou un autre pays pour un nouveau départ : vous en seriez tous les deux ?"},
  {c:"avenir", q:"Prendre sa retraite plus tôt quitte à moins gagner avant : un projet que vous partagez vraiment ?"},
  {c:"avenir", q:"Si l'un de vous devait choisir entre un rêve personnel et la stabilité du couple, que devrait-il se passer ?"},

  // Société & actu (général)
  {c:"societe", q:"Faut-il voter pareil en couple, ou les désaccords politiques doivent rester hors du foyer ?"},
  {c:"societe", q:"La place des écrans à l'école pour les enfants : vous êtes plutôt pour ou contre ?"},
  {c:"societe", q:"Le bénévolat ou l'engagement associatif : est-ce que ça devrait faire partie de votre vie de couple ?"},

  // Politique & valeurs
  {c:"politique", q:"Le vote obligatoire : une bonne idée pour la démocratie, ou une atteinte à la liberté ?"},
  {c:"politique", q:"La retraite à 64 ans ou plus tard encore : comment ça change vos projets à deux ?"},
  {c:"politique", q:"Faut-il davantage taxer les hauts revenus pour financer les services publics : vous êtes d'accord ?"},
  {c:"politique", q:"Le service civique ou militaire obligatoire pour les jeunes : pour ou contre, chacun ?"},
  {c:"politique", q:"Afficher ses opinions politiques publiquement sur les réseaux : vous le faites, ou vous évitez ?"},
  {c:"politique", q:"L'immigration et les politiques migratoires : un sujet que vous arrivez à débattre calmement en couple ?"},
  {c:"politique", q:"La liberté d'expression a-t-elle des limites, et lesquelles selon vous deux ?"},
  {c:"politique", q:"Voter blanc ou s'abstenir par conviction : vous comprenez cette démarche, ou pas du tout ?"},
  {c:"politique", q:"Le rôle de l'État dans l'économie : plus d'intervention ou plus de liberté de marché, chacun votre avis ?"},
  {c:"politique", q:"Débattre de politique avec sa famille pendant les repas : vous évitez, ou vous vous lancez volontiers ?"},

  // Argent & finances (suite)
  {c:"argent", q:"Faut-il se fixer une limite au-delà de laquelle on prévient l'autre avant un achat ?"},
  {c:"argent", q:"Un abonnement inutile que vous payez encore à deux : qui devrait s'en occuper, et pourquoi personne ne le fait ?"},
  {c:"argent", q:"Faire des cadeaux chers à sa propre famille sur le budget commun : ça se discute, ou c'est automatique ?"},
  {c:"argent", q:"Négocier son salaire : est-ce que l'un de vous pousse plus l'autre à le faire ?"},
  {c:"argent", q:"Miser sur les cryptomonnaies avec l'épargne du couple : un risque que vous prendriez ensemble ?"},

  // Travail & carrière (suite)
  {c:"travail", q:"Répondre aux mails professionnels le week-end : une habitude qui empiète sur votre couple ?"},
  {c:"travail", q:"Un job bien payé mais sans passion, ou un métier passion moins rémunérateur : lequel choisiriez-vous à deux ?"},
  {c:"travail", q:"Créer sa propre entreprise ensemble : une bonne idée, ou le meilleur moyen de tout compliquer ?"},
  {c:"travail", q:"Accepter un poste à l'étranger pour un an : l'autre devrait-il forcément suivre ?"},
  {c:"travail", q:"Le syndrome de l'imposteur au travail : vous en parlez facilement à l'autre, ou vous le cachez ?"},

  // Maison & quotidien (suite)
  {c:"maison", q:"Qui décide de la température du chauffage ou de la clim chez vous, et est-ce un vrai sujet de tension ?"},
  {c:"maison", q:"Recevoir la famille de l'autre à l'improviste sans prévenir : ça passe chez vous ?"},
  {c:"maison", q:"Refaire des travaux soi-même ou payer un pro : qui tranche, dans votre couple ?"},
  {c:"maison", q:"Y a-t-il un coin de la maison que l'un considère comme « le sien », sans vraiment le partager ?"},
  {c:"maison", q:"Emménager chez l'un plutôt que de trouver un logement neutre : est-ce que ça a créé un déséquilibre ?"},

  // Enfants & éducation (suite)
  {c:"enfants", q:"Inscrire les enfants à énormément d'activités extrascolaires : une chance qu'on leur offre, ou une pression ?"},
  {c:"enfants", q:"Laisser un enfant choisir son style ou son prénom d'usage : jusqu'où le laisser décider seul ?"},
  {c:"enfants", q:"Comparer votre enfant à celui des autres devant lui : totalement interdit, ou ça arrive parfois chez vous ?"},
  {c:"enfants", q:"Un enfant qui préfère clairement un parent à l'autre : comment vous le viviez, tous les deux ?"},
  {c:"enfants", q:"Confier souvent les enfants aux grands-parents : un vrai coup de main, ou une délégation trop facile ?"},

  // Écologie (suite)
  {c:"ecologie", q:"Composter, récupérer l'eau de pluie, jardiner bio : jusqu'où êtes-vous prêts à aller ensemble ?"},
  {c:"ecologie", q:"Un(e) proche qui vous fait la morale écolo en permanence : ça vous parle, ou ça vous agace ?"},
  {c:"ecologie", q:"Réduire drastiquement vos déplacements en avion : un engagement que vous prendriez à deux ?"},
  {c:"ecologie", q:"Le prix plus élevé du bio et du local : un budget que vous priorisez vraiment, ou seulement en théorie ?"},

  // Numérique & réseaux (suite)
  {c:"numerique", q:"Partager le code de son téléphone avec l'autre : évident, ou une question de confiance mal posée ?"},
  {c:"numerique", q:"Passer du temps sur des jeux vidéo en solo le soir : ça vous convient à tous les deux ?"},
  {c:"numerique", q:"Utiliser une appli de localisation pour se rassurer mutuellement : rassurant, ou franchement flippant ?"},
  {c:"numerique", q:"Débattre en ligne avec des inconnus sur des sujets sensibles : ça vous arrive, et l'autre en pense quoi ?"},

  // Technologie & IA (suite)
  {c:"technologie", q:"Une IA qui donnerait son avis sur vos disputes de couple : vous testeriez, ou jamais de la vie ?"},
  {c:"technologie", q:"Se faire remplacer au travail par une IA d'ici dix ans : une peur que vous partagez tous les deux ?"},
  {c:"technologie", q:"Des lunettes connectées qui affichent des infos en permanence : vous porteriez ça au quotidien ?"},
  {c:"technologie", q:"Laisser une IA planifier vos vacances de A à Z : vous lui feriez confiance ?"},

  // Couple & habitudes (suite)
  {c:"couple", q:"Se dire « je t'aime » tous les jours : un rituel nécessaire, ou ça perd son sens à force ?"},
  {c:"couple", q:"Avoir des amis uniquement communs, ou garder chacun ses cercles séparés : que préférez-vous vraiment ?"},
  {c:"couple", q:"Le premier à dire « pardon » après une dispute : c'est toujours le même chez vous ?"},
  {c:"couple", q:"Vous retrouver seuls sans les enfants régulièrement : vous le faites assez souvent, selon vous ?"},
  {c:"couple", q:"Un couple doit-il tout partager sur les réseaux, ou garder une part de vie privée à deux ?"},
  {c:"couple", q:"Rejouer votre premier rendez-vous chaque année : une tradition que vous aimeriez instaurer ?"},

  // Intimité & complicité (suite)
  {c:"intimite", q:"Se faire des compliments devant les autres ou seulement en privé : lequel préférez-vous vraiment ?"},
  {c:"intimite", q:"Instaurer un rituel du soir juste tous les deux, sans écran : réaliste dans votre quotidien ?"},
  {c:"intimite", q:"Se souvenir des petites choses que l'autre aime : qui est le plus attentif dans le couple, selon vous ?"},

  // Vacances & loisirs (suite)
  {c:"vacances", q:"Un voyage improvisé sans réservation à l'avance : vous tenteriez l'expérience à deux ?"},
  {c:"vacances", q:"Faire du camping sauvage ou préférer le tout confort : vous êtes sur la même longueur d'onde ?"},
  {c:"vacances", q:"Consacrer ses vacances à visiter la famille plutôt qu'à se reposer : un choix qui vous convient ?"},
  {c:"vacances", q:"Un hobby coûteux que l'un pratique seul (moto, plongée…) : l'autre doit-il l'accepter sans discuter ?"},

  // Culture & sorties (suite)
  {c:"culture", q:"Aller au concert d'un artiste que seul l'un de vous aime : par amour, ou par corvée ?"},
  {c:"culture", q:"Regarder une série ensemble sans jamais avancer sans l'autre : une règle que vous respectez vraiment ?"},
  {c:"culture", q:"Découvrir un musée ou une expo sur un coup de tête un dimanche : ça vous arrive souvent ?"},
  {c:"culture", q:"Avoir un livre ou un film culte que l'autre déteste : ça vous a déjà causé un vrai débat ?"},

  // Sport (suite)
  {c:"sport", q:"Regarder le sport à la télé plusieurs heures le week-end : ça crée de la frustration chez l'autre ?"},
  {c:"sport", q:"Faire du sport ensemble tôt le matin : romantique, ou source de disputes garanties ?"},
  {c:"sport", q:"Supporter des équipes rivales dans le même couple : un vrai problème, ou juste un jeu ?"},
  {c:"sport", q:"Se muscler pour soi ou pour plaire à l'autre : où est la frontière, selon vous ?"},
  {c:"sport", q:"L'un de vous arrête totalement le sport après une blessure : l'autre doit-il s'adapter ?"},
  {c:"sport", q:"Partir un week-end entier pour un match ou une course : vous accepteriez que l'autre y aille seul(e) ?"},

  // Alimentation (suite)
  {c:"alimentation", q:"Manger devant la télé plutôt qu'à table : une habitude qui vous convient à tous les deux ?"},
  {c:"alimentation", q:"Faire un régime strict pour perdre du poids : l'autre doit-il suivre par solidarité ?"},
  {c:"alimentation", q:"Le grignotage du soir : un plaisir partagé, ou une source de tension silencieuse ?"},
  {c:"alimentation", q:"Qui décide du menu de la semaine chez vous, et est-ce vraiment équitable ?"},

  // Animaux de compagnie (suite)
  {c:"animaux", q:"Choisir la race ou l'espèce d'un futur animal : une décision à deux, ou un coup de cœur qui l'emporte ?"},
  {c:"animaux", q:"Un animal qui coûte cher en vétérinaire chaque mois : jusqu'où vous suivez sans discuter ?"},
  {c:"animaux", q:"Voyager moins pour ne pas laisser l'animal seul : un vrai sacrifice de couple, ou ça ne vous dérange pas ?"},

  // Santé & bien-être (suite)
  {c:"sante", q:"Faire une psychothérapie chacun de son côté : un sujet que vous partagez avec l'autre, ou pas du tout ?"},
  {c:"sante", q:"Le stress de l'un qui déteint sur l'ambiance à la maison : vous en parlez ouvertement ?"},
  {c:"sante", q:"Prendre soin de sa santé mentale autant que de sa santé physique : un équilibre respecté chez vous deux ?"},
  {c:"sante", q:"Se forcer à aller mieux pour rassurer l'autre : ça vous est déjà arrivé ?"},

  // Croyances & spiritualité (suite)
  {c:"spiritualite", q:"La méditation ou le yoga comme pratique spirituelle laïque : ça vous parle à tous les deux ?"},
  {c:"spiritualite", q:"Élever les enfants sans aucune religion par choix : une évidence, ou un sujet encore ouvert chez vous ?"},
  {c:"spiritualite", q:"Croire à une forme de destin ou de signes dans la vie : vous êtes alignés là-dessus ?"},

  // Apparence & image de soi (suite)
  {c:"apparence", q:"Se sentir jugé par le regard de l'autre sur son physique : ça vous arrive, même sans mauvaise intention ?"},
  {c:"apparence", q:"Prendre soin de son apparence pour soi, ou aussi pour plaire à l'autre : où en êtes-vous ?"},
  {c:"apparence", q:"Vieillir ensemble et accepter les changements physiques de l'autre : ça vous fait peur, ou pas du tout ?"},

  // Vie sociale & voisinage (suite)
  {c:"voisinage", q:"Avoir des amis que l'autre n'aime pas trop : vous les voyez quand même, séparément ?"},
  {c:"voisinage", q:"Organiser une fête chez vous sans demander l'avis de l'autre avant : ça arrive, et comment ça se passe ?"},
  {c:"voisinage", q:"S'impliquer dans la vie du quartier (association, copropriété) : l'un de vous s'y colle plus que l'autre ?"},

  // Belle-famille (suite)
  {c:"famille", q:"Passer plus de vacances chez une belle-famille que chez l'autre : un déséquilibre que vous voyez chez vous ?"},
  {c:"famille", q:"Défendre son/sa conjoint(e) devant sa propre famille en cas de critique : ça vous est déjà arrivé de ne pas le faire ?"},
  {c:"famille", q:"Adopter les traditions familiales de l'autre comme les vôtres : facile, ou un vrai effort d'adaptation ?"},

  // Projets d'avenir (suite)
  {c:"avenir", q:"Se marier ou rester en couple sans papiers : un sujet tranché chez vous, ou encore en discussion ?"},
  {c:"avenir", q:"Changer complètement de vie (van, île, campagne) d'ici cinq ans : un rêve que vous partagez vraiment ?"},
  {c:"avenir", q:"Se projeter avec ou sans enfants : est-ce que vous avez vraiment la même vision, tous les deux ?"},

  // Société & actu (suite)
  {c:"societe", q:"L'intelligence artificielle qui remplace des métiers entiers : une inquiétude que vous partagez ?"},
  {c:"societe", q:"Le télétravail généralisé : une bonne chose pour la société, selon vous deux ?"},
  {c:"societe", q:"La désinformation sur les réseaux sociaux : est-ce que ça vous divise, vous et votre entourage ?"},
  {c:"societe", q:"Réduire son empreinte numérique (mails, vidéos, cloud) : un geste concret que vous feriez ensemble ?"},
];

/* ---------- 2. Générateurs de questions à partir d'un titre d'actu ---------- */
const TEMPLATES = {
  societe: [
    t => `Cette actu — « ${t} » — vous êtes plutôt d'accord ou pas du tout, tous les deux ?`,
    t => `« ${t} » : est-ce que ça pourrait vous arriver, à vous aussi ?`,
    t => `Sur « ${t} », qui de vous deux changerait d'avis le plus difficilement ?`,
  ],
  politique: [
    t => `« ${t} » — vous voteriez pareil sur ce sujet, tous les deux ?`,
    t => `Sur « ${t} », est-ce un sujet que vous évitez d'aborder en couple, ou pas du tout ?`,
  ],
  argent: [
    t => `« ${t} » — ça changerait quoi dans votre budget si ça vous arrivait ?`,
    t => `Sur ce sujet — « ${t} » — êtes-vous plutôt économes ou dépensiers, chacun ?`,
  ],
  travail: [
    t => `« ${t} » — ça vous ferait revoir votre organisation de couple ?`,
    t => `Sur « ${t} », lequel de vous deux serait le plus impacté au quotidien ?`,
  ],
  ecologie: [
    t => `« ${t} » : un effort que vous seriez prêts à faire ensemble, ou pas encore ?`,
    t => `Sur « ${t} », qui de vous deux est le plus engagé au quotidien ?`,
  ],
  numerique: [
    t => `« ${t} » — est-ce que ça changerait vos habitudes d'écran en couple ?`,
    t => `Sur « ${t} », vous seriez plutôt pour ou contre, chacun de votre côté ?`,
  ],
  technologie: [
    t => `« ${t} » — ça vous rassure ou ça vous inquiète, tous les deux ?`,
  ],
  sante: [
    t => `« ${t} » : est-ce un sujet dont vous parlez facilement entre vous ?`,
  ],
  culture: [
    t => `« ${t} » — ça vous donnerait envie d'une sortie à deux ?`,
  ],
  sport: [
    t => `« ${t} » — un des deux serait plus intéressé que l'autre, non ?`,
  ],
  default: [
    t => `Vous en pensez quoi, chacun, de « ${t} » ?`,
    t => `« ${t} » — sujet qui vous rapproche ou qui vous oppose, selon vous ?`,
  ],
};

/* ---------- 3. Sources d'actu (RSS via rss2json) ---------- */
const FEEDS = [
  {url:"https://www.lemonde.fr/societe/rss_full.xml", cat:"societe", source:"Le Monde"},
  {url:"https://www.lemonde.fr/politique/rss_full.xml", cat:"politique", source:"Le Monde"},
  {url:"https://www.lemonde.fr/argent/rss_full.xml", cat:"argent", source:"Le Monde"},
  {url:"https://www.lemonde.fr/planete/rss_full.xml", cat:"ecologie", source:"Le Monde"},
  {url:"https://www.lemonde.fr/pixels/rss_full.xml", cat:"numerique", source:"Le Monde"},
  {url:"https://www.lemonde.fr/sport/rss_full.xml", cat:"sport", source:"Le Monde"},
  {url:"https://www.lemonde.fr/culture/rss_full.xml", cat:"culture", source:"Le Monde"},
  {url:"https://www.lemonde.fr/sciences/rss_full.xml", cat:"technologie", source:"Le Monde"},
  {url:"https://www.francetvinfo.fr/sante.rss", cat:"sante", source:"France Info"},
  {url:"https://www.francetvinfo.fr/economie.rss", cat:"travail", source:"France Info"},
  {url:"https://www.francetvinfo.fr/monde.rss", cat:"societe", source:"France Info"},
  {url:"https://www.slate.fr/rss.xml", cat:"societe", source:"Slate"},
  {url:"https://www.numerama.com/feed/", cat:"technologie", source:"Numerama"},
  {url:"https://www.20minutes.fr/rss/une.xml", cat:"societe", source:"20 Minutes"},
];

/* ---------- Utilitaires ---------- */
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

function todaySeed(){
  const d = new Date();
  return Number(`${d.getFullYear()}${d.getMonth()+1}${d.getDate()}`);
}
function seededPick(arr, seed){
  return arr[seed % arr.length];
}
function shortTitle(t, max=70){
  t = t.replace(/\s+/g," ").trim();
  return t.length > max ? t.slice(0, max-1).trim() + "…" : t;
}
function showToast(msg){
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("is-visible");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(()=> el.classList.remove("is-visible"), 2200);
}
function copyText(text){
  navigator.clipboard?.writeText(text).then(
    ()=> showToast("Copié — collez-le dans votre message !"),
    ()=> showToast("Impossible de copier automatiquement, sélectionnez le texte.")
  );
}

/* ---------- LocalStorage : historique des sujets discutés ---------- */
const STORE_KEY = "debat-couple-historique";
function getHistory(){
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || []; }
  catch { return []; }
}
function addHistory(question){
  const hist = getHistory();
  hist.unshift({q: question, d: new Date().toLocaleDateString("fr-FR")});
  localStorage.setItem(STORE_KEY, JSON.stringify(hist.slice(0, 150)));
  renderHistory();
}
function clearHistory(){
  localStorage.removeItem(STORE_KEY);
  renderHistory();
}
function renderHistory(){
  const hist = getHistory();
  $("#history-empty").style.display = hist.length ? "none" : "block";
  $("#history-list").innerHTML = hist.map(h => `
    <li><span>${h.q}</span><time>${h.d}</time></li>
  `).join("");
}

/* ---------- Le duel du jour ---------- */
let duelPool = BANK;
function renderDuel(random=false){
  const seed = random ? Math.floor(Math.random()*10000) : todaySeed();
  const item = seededPick(duelPool, seed);
  $("#duel-tag").textContent = CATEGORIES[item.c] || "Couple";
  $("#duel-question").textContent = item.q;
  $("#duel-card").dataset.question = item.q;
}
$("#duel-shuffle").addEventListener("click", ()=> renderDuel(true));
$("#duel-copy").addEventListener("click", ()=> copyText($("#duel-card").dataset.question));

/* ---------- Banque à sujets avec filtres ---------- */
let activeFilter = "tous";
function renderFilters(){
  const cats = ["tous", ...Object.keys(CATEGORIES).filter(c => BANK.some(b=>b.c===c))];
  $("#filters").innerHTML = cats.map(c => `
    <button class="filter ${c===activeFilter ? 'is-active':''}" data-cat="${c}">
      ${c === "tous" ? `Tous les sujets (${BANK.length})` : CATEGORIES[c]}
    </button>
  `).join("");
  $$(".filter").forEach(btn => btn.addEventListener("click", () => {
    activeFilter = btn.dataset.cat;
    renderFilters();
    renderBank();
  }));
}
function renderBank(){
  const done = new Set(getHistory().map(h=>h.q));
  const items = activeFilter === "tous" ? BANK : BANK.filter(i => i.c === activeFilter);
  $("#bank-grid").innerHTML = items.map((item) => `
    <article class="card">
      <span class="card__tag">${CATEGORIES[item.c]}</span>
      <p class="card__question">${item.q}</p>
      <div class="card__foot">
        <button class="icon-btn copy-bank" data-i="${BANK.indexOf(item)}">Copier</button>
        <button class="icon-btn ${done.has(item.q) ? 'is-done':''} done-bank" data-i="${BANK.indexOf(item)}">
          ${done.has(item.q) ? "✓ Discuté" : "Marquer discuté"}
        </button>
      </div>
    </article>
  `).join("");

  $$(".copy-bank").forEach(b => b.addEventListener("click", ()=> copyText(BANK[b.dataset.i].q)));
  $$(".done-bank").forEach(b => b.addEventListener("click", ()=>{
    addHistory(BANK[b.dataset.i].q);
    renderBank();
  }));
}

/* ---------- Actu du jour → débats ---------- */
async function fetchFeed(feed){
  const api = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`;
  const res = await fetch(api);
  if (!res.ok) throw new Error("Réseau indisponible pour " + feed.source);
  const data = await res.json();
  if (data.status !== "ok") throw new Error("Flux indisponible pour " + feed.source);
  return (data.items || []).slice(0, 2).map(it => ({
    title: shortTitle(it.title),
    link: it.link,
    cat: feed.cat,
    source: feed.source,
  }));
}

function generateDebate(headline){
  const pool = TEMPLATES[headline.cat] || TEMPLATES.default;
  const fn = pool[Math.floor(Math.random()*pool.length)];
  return fn(headline.title);
}

async function loadNews(){
  $("#news-status").textContent = `Récupération des dernières infos sur ${FEEDS.length} sources…`;
  $("#news-grid").innerHTML = "";
  const results = await Promise.allSettled(FEEDS.map(fetchFeed));
  const headlines = results.filter(r => r.status === "fulfilled").flatMap(r => r.value);

  if (!headlines.length){
    $("#news-status").textContent = "Impossible de récupérer l'actu en direct pour le moment — voici des sujets de la banque locale à la place.";
    const fallback = BANK.filter(b=>["societe","argent","ecologie","numerique","sante","politique"].includes(b.c)).slice(0,8);
    $("#news-grid").innerHTML = fallback.map(item => `
      <article class="card">
        <span class="card__tag">${CATEGORIES[item.c]}</span>
        <p class="card__question">${item.q}</p>
        <div class="card__foot">
          <button class="icon-btn copy-fallback" data-q="${encodeURIComponent(item.q)}">Copier</button>
        </div>
      </article>
    `).join("");
    $$(".copy-fallback").forEach(b => b.addEventListener("click", ()=> copyText(decodeURIComponent(b.dataset.q))));
    return;
  }

  $("#news-status").textContent = `${headlines.length} sujets d'actu trouvés sur ${FEEDS.length} sources — transformés en débats.`;
  $("#news-grid").innerHTML = headlines.map((h) => {
    const question = generateDebate(h);
    return `
      <article class="card">
        <span class="card__tag">${CATEGORIES[h.cat]} · ${h.source}</span>
        <p class="card__headline">${h.title}</p>
        <p class="card__question">${question}</p>
        <div class="card__foot">
          <button class="icon-btn copy-news" data-q="${encodeURIComponent(question)}">Copier</button>
          <button class="icon-btn done-news" data-q="${encodeURIComponent(question)}">Marquer discuté</button>
          <a class="card__link" href="${h.link}" target="_blank" rel="noopener">Lire l'article</a>
        </div>
      </article>
    `;
  }).join("");

  $$(".copy-news").forEach(b => b.addEventListener("click", ()=> copyText(decodeURIComponent(b.dataset.q))));
  $$(".done-news").forEach(b => b.addEventListener("click", ()=>{
    addHistory(decodeURIComponent(b.dataset.q));
    showToast("Ajouté à votre historique !");
  }));
}

$("#news-refresh").addEventListener("click", loadNews);
$("#history-clear").addEventListener("click", clearHistory);

/* ---------- Init ---------- */
function init(){
  $("#today-date").textContent = new Date().toLocaleDateString("fr-FR", {
    weekday:"long", day:"numeric", month:"long", year:"numeric"
  });
  renderDuel(false);
  renderFilters();
  renderBank();
  renderHistory();
  loadNews();
}
document.addEventListener("DOMContentLoaded", init);
