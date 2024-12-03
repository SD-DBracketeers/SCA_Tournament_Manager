import os

# Get all .txt files in the current directory
txt_files = [file for file in os.listdir('.') if file.endswith('.txt')]

# Process each file
for file in txt_files:
    with open(file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        for line in lines:
            # Strip newline characters and print formatted output
            print(f'<option>{line.strip()}</option>')

'''
Okay I ran the script but I don't think it's worth putting these into the dropdowns because
look at the size of these options:

<option>Shire of Arenal</option>
<option>Shire of Beau Fort</option>
<option>Barony of Bryn Madoc</option>
<option>Shire of Crimson River</option>
<option>Shire of Depedale</option>
<option>Stronghold of Dragonfly Marsh</option>
<option>Shire of Drakenmere</option>
<option>Shire of Easaraigh</option>
<option>Shire Des Forges</option>
<option>Shire of Forth Castle</option>
<option>Barony of Glaedenfeld</option>
<option>Shire of Glynn Rhe</option>
<option>Canton of Hochwald</option>
<option>Barony of Iron Mountain</option>
<option>Shire of Loch an Fhraoich</option>
<option>Shire of Loch Cairn</option>
<option>Shire of Marion Glen</option>
<option>Shire of Nant-y-Derwyddon</option>
<option>Shire of Okeborne Keep</option>
<option>Barony of Osprey</option>
<option>Shire of Owl's Nest</option>
<option>Shire of Phoenix Glade</option>
<option>College of Phoenix Rising</option>
<option>Shire of Redewolfden</option>
<option>Shire of Rising Stone</option>
<option>Shire of Sol Haven</option>
<option>Barony of South Downs</option>
<option>Canton of South Reach</option>
<option>Shire of Terminus Terrae</option>
<option>Shire of Tir Briste</option>
<option>Barony of Thor’s Mountain</option>
<option>Shire of Thorngill</option>
<option>Shire of Vulpine Reach</option>
<option>Barony of Atenveldt</option>
<option>Shire of Burning Sands</option>
<option>Barony of Erud Sul</option>
<option>Barony of Granite Mountain</option>
<option>Barony of Mons Tonitrus</option>
<option>College of Saint Felix</option>
<option>Barony of Sun Dragon</option>
<option>Barony of Tir Ysgithr</option>
<option>Barony of Twin Moons</option>
<option>Shire of Vallis Aeris</option>
<option>Shire of Windale</option>
<option>Barony of An Dubhaigeainn</option>
<option>Shire of Anglespur</option>
<option>Canton of Appleholm</option>
<option>Shire of Ar n-Eilean-ne</option>
<option>Shire of Avonmore</option>
<option>Shire of Barren Sands</option>
<option>Canton of Basingestoches</option>
<option>Barony of Bergental</option>
<option>Barony of Beyond the Mountain</option>
<option>Barony of Bhakail</option>
<option>Shire of Blak Rose</option>
<option>Barony of the Bridge</option>
<option>Canton of Brokenbridge</option>
<option>Barony of Buckland Cross</option>
<option>Shire of Caer Adamant</option>
<option>Barony of Carillion</option>
<option>Barony of Carolingia</option>
<option>Shire of Coill Tuar</option>
<option>Shire of Coldwood</option>
<option>Barony of Concordia of the Snows</option>
<option>Canton of Distant Shore</option>
<option>Barony of Dragonship Haven</option>
<option>Shire of Eisental</option>
<option>Barony of Endewearde</option>
<option>Canton of Forestgate</option>
<option>Riding of Giggleswick</option>
<option>Shire of Glenn Linn</option>
<option>Canton of Gryphonwald</option>
<option>Shire of Hadchester</option>
<option>Shire of Hartshorn-dale</option>
<option>Barony of Havre des Glaces</option>
<option>Canton of Hawke's Reache</option>
<option>Barony of Iron Bog</option>
<option>Bailiwick of Ivyeinrust</option>
<option>Barony of L'ile du Dragon Dormant</option>
<option>Canton of Lions End</option>
<option>Shire of Lyndhaven</option>
<option>Province of Malagentia</option>
<option>Shire of Midland Vale</option>
<option>Shire of Montevale</option>
<option>Shire of Mountain Freehold</option>
<option>Shire of Nordenhalle</option>
<option>Shire of Northern Outpost</option>
<option>Canton of Northpass</option>
<option>Shire of Old Stonebridges</option>
<option>Shire of Owlsherst</option>
<option>Shire of Panther Vale</option>
<option>Shire of Quintavia</option>
<option>Riding of Ravensbridge</option>
<option>Stronghold of Ravensdale</option>
<option>Barony of Ruantallan</option>
<option>Shire of Rusted Woodlands</option>
<option>Canton of Seashire</option>
<option>Barony of Settmour Swamp</option>
<option>Barony of Smoking Rocks</option>
<option>Barony of Stonemarche</option>
<option>Canton of the Towers</option>
<option>Canton of Wyndriche</option>
<option>Canton of Ynys y Gwaun</option>
<option>Crown Province of Østgarðr</option>
<option>Barony of Aarnimetsä</option>
<option>Shire of Ad Flumen Caerulum</option>
<option>Shire of Aros</option>
<option>Shire of Attemark</option>
<option>Shire of Baggeholm</option>
<option>Canton of Cluain Óir</option>
<option>Shire of Depedene under Wychwood</option>
<option>Canton of Drei Eichen</option>
<option>Shire of Dun in Mara</option>
<option>Barony of Eplaheimr</option>
<option>Shire of Flintheath</option>
<option>Shire of Frostheim</option>
<option>Shire of Glen Rathlin</option>
<option>Shire of Gorynovo</option>
<option>Barony of Gotvik</option>
<option>Shire of Gyllengran</option>
<option>Shire of Harpelstane</option>
<option>Shire of Holmrike</option>
<option>Canton of Hukka</option>
<option>Canton of Humalasalo</option>
<option>Shire of Juneborg</option>
<option>Canton of Kaarnemaa</option>
<option>College of Kingeslake</option>
<option>Shire of Klakavirki</option>
<option>Barony of Knights Crossing</option>
<option>Shire of Löghammar</option>
<option>Canton of Meadowmarsh</option>
<option>Canton of Miehonlinna</option>
<option>Shire of Mynydd Gwyn</option>
<option>Shire of Polderslot</option>
<option>Shire of Pontalarch</option>
<option>Canton of Poukka</option>
<option>Shire of Reengarda</option>
<option>Canton of Roterde</option>
<option>College of St John of Rila</option>
<option>Barony of Styringheim</option>
<option>Shire of Thamesreach</option>
<option>Canton of Turmstadt</option>
<option>Canton of Two Seas</option>
<option>Shire of Ulvberget</option>
<option>Shire of Uma</option>
<option>Canton of Unikankare</option>
<option>Canton of Vielburgen</option>
<option>Shire of West Dragonshire</option>
<option>Shire of Örehus</option>
<option>Shire of Adora</option>
<option>Barony of Aneala</option>
<option>College of Blessed Herman the Cripple</option>
<option>Shire of Bordescros</option>
<option>Canton of Burnfield</option>
<option>Canton of Cluain</option>
<option>Shire of Darton</option>
<option>Shire of Dismal Fogs</option>
<option>Canton of Dragons Bay</option>
<option>Hamlet of Frostheath</option>
<option>Hamlet of Gildenwick</option>
<option>Hamelt of Hareby</option>
<option>Hamlet of Hinterland Downs</option>
<option>Barony of Ildhafn</option>
<option>Barony of Innilgard</option>
<option>Barony of Krae Glas</option>
<option>Hamlet of Lyttleham</option>
<option>Barony of Mordenvale</option>
<option>Canton of Okewaite</option>
<option>Barony of Politarchopolis</option>
<option>Hamlet of Radburne</option>
<option>Barony of River Haven</option>
<option>Barony of Rowany</option>
<option>Shire of Sherwater Wai</option>
<option>Barony of Southron Gaard</option>
<option>College of St. Basil the Great</option>
<option>College of St. Christina the Astonishing</option>
<option>College of St. Crispin</option>
<option>Barony of St. Florian de la Riviere</option>
<option>College of St. Monica</option>
<option>College of St. Ursula</option>
<option>Hamlet of Stegby</option>
<option>Barony of Stormhold</option>
<option>Canton of Stowe on the Wowld</option>
<option>Shire of Strathcorbie</option>
<option>Canton of Torlyon</option>
<option>Hamelt of Wildmoor</option>
<option>Barony of Ynys Fawr</option>
<option>Canton of Amurgorod</option>
<option>Barony of An Crosaire</option>
<option>Shire of Bentonshire</option>
<option>Barony of Castlemere</option>
<option>Barony of Darkwater</option>
<option>Shire of Dragons Chase</option>
<option>Canton of Loch Gryffyn</option>
<option>Barony of Marcaster</option>
<option>Barony of Oldenfeld</option>
<option>Shire of the Ruins</option>
<option>Shire of Sangre del Sol</option>
<option>Shire of Sea March</option>
<option>Shire of Southkeep</option>
<option>Shire of Starhaven</option>
<option>Shire of Sudrholt</option>
<option>Canton of Swampkeype</option>
<option>Shire of Tri Os</option>
<option>Shire of Trysel</option>
<option>Barony of Wyvernwoode</option>
<option>Barony of Adiantum</option>
<option>Canton of Akornebir</option>
<option>Shire of Ambergard</option>
<option>Shire of Appledore</option>
<option>Barony of Aquaterra</option>
<option>Barony of Blatha an Oir</option>
<option>Shire of Briaroak</option>
<option>Canton of Caladphort</option>
<option>Shire of Coeur du Val</option>
<option>Shire of Coill Mhór</option>
<option>Shire of Cold Keep</option>
<option>Shire of Corvaria</option>
<option>College of Cranehaven</option>
<option>Shire of Danescombe</option>
<option>Barony of Dragons Laire</option>
<option>Barony of Dragon’s Mist</option>
<option>Shire of Druim Doineann</option>
<option>Shire of Fire Mountain Keep</option>
<option>Barony of Glymm Mere</option>
<option>Barony of Glyn Dwfn</option>
<option>Shire of Hartwood</option>
<option>Shire of Hauksgarðr</option>
<option>Canton of Kaldor Ness</option>
<option>Shire of Krakafjord</option>
<option>Barony of Lions Gate</option>
<option>Shire of Lionsdale</option>
<option>College of Lyonsmarche</option>
<option>Barony of Madrone</option>
<option>Shire of Mountain Edge</option>
<option>Shire of Myrtle Holt</option>
<option>Canton of Porte de l’Eau</option>
<option>Shire of Ramsgaard</option>
<option>Shire of River’s Bend</option>
<option>Barony of Seagirt</option>
<option>Canton of Silverhart</option>
<option>Shire of Southmarch</option>
<option>Barony of Stromgard</option>
<option>Barony of Terra Pomaria</option>
<option>Shire of Thornwold</option>
<option>Barony of Three Mountains</option>
<option>Shire of Tir Bannog</option>
<option>Shire of Tymberhavene</option>
<option>Barony of Vulcanfeldt</option>
<option>Barony of Wastekeep</option>
<option>Barony of Wealdsmere</option>
<option>Barony of Wyewood</option>
<option>Canton of Aire Faucon</option>
<option>Canton of Attilium</option>
<option>Barony of Black Diamond</option>
<option>Shire of Border Vale Keep</option>
<option>Barony of Bright Hills</option>
<option>Canton of Brockore Abbey</option>
<option>Canton of Buckston-on-Eno</option>
<option>Barony of Caer Mear</option>
<option>Canton of Charlesbury Crossing</option>
<option>Canton of Crois Brigte</option>
<option>Canton of Cydllan Downs</option>
<option>Barony of Dun Carraig</option>
<option>Canton of Elvegast</option>
<option>Canton of Falconcree</option>
<option>Barony of Hawkwood</option>
<option>Barony of Hidden Mountain</option>
<option>Barony of Highland Foorde</option>
<option>Shire of Isenfir</option>
<option>Canton of Kapellenberg</option>
<option>Barony of Lochmere</option>
<option>Barony of Marinus</option>
<option>Canton of Middlegate</option>
<option>Canton of Misty Marsh by the Sea</option>
<option>Canton of Moorhaven</option>
<option>Canton of Nimenefeld</option>
<option>Barony of Nottinghill Coill</option>
<option>Barony of Ponte Alto</option>
<option>Barony of Raven's Cove</option>
<option>Canton of Ritterwald</option>
<option>Shire of Roxbury Mill</option>
<option>Barony of Sacred Stone</option>
<option>Canton of Saint Georges</option>
<option>Canton of Salesberie Glen</option>
<option>Shire of Seareach</option>
<option>Canton of Seven Hills</option>
<option>Shire of Spiaggia Levantina</option>
<option>Barony of Stierbach</option>
<option>Canton of Stormwall</option>
<option>Barony of Storvik</option>
<option>Canton of Sudentorre</option>
<option>Canton of Tear-Sea's Shore</option>
<option>Barony of Tir-y-Don</option>
<option>Shire of Ursus Bay</option>
<option>Barony of Windmasters' Hill</option>
<option>College of Yarnvid</option>
<option>Shire of Border Downs</option>
<option>Barony of Caer Anterth Mawr</option>
<option>Barony of Castel Rouge</option>
<option>Canton of Coille Stoirmeil</option>
<option>Shire of Coldedernhale</option>
<option>Shire of Darkstone</option>
<option>Shire of Dreibrucken</option>
<option>Shire of Falcon's Keep</option>
<option>Shire of the Inner Sea</option>
<option>Barony of Jaravellier</option>
<option>Shire of Korsväg</option>
<option>Shire of Mare Amethystinum</option>
<option>Shire of Midewinde</option>
<option>Shire of Noiregarde</option>
<option>Canton of Nordleigh</option>
<option>Barony of Nordskogen</option>
<option>Shire of Orlova Dolina</option>
<option>Shire of Rivenwood Tower</option>
<option>Shire of Rockhaven</option>
<option>Shire of Rokeclif</option>
<option>Shire of Schattentor</option>
<option>Shire of Shattered Oak</option>
<option>Shire of Silfren Mere</option>
<option>Shire of Skerjastrond</option>
<option>Stronghold of Westwatch</option>
<option>College of Svatý Sebesta</option>
<option>Shire of Trewint</option>
<option>Shire of Vilku Urvas</option>
<option>Barony of Windhaven</option>
<option>Canton of Ardchreag</option>
<option>Shire of Bastille du Lac</option>
<option>Barony of Ben Dunfirth</option>
<option>Canton of Beremere</option>
<option>Canton of Bryniau Tywynnog</option>
<option>Canton of Caldrithig</option>
<option>Shire of Champcorbeau</option>
<option>Royal Citie of Eoforwic</option>
<option>Stronghold of Greyfells</option>
<option>Canton of Monadh</option>
<option>Canton of Northgeatham</option>
<option>Canton of Petrea Thule</option>
<option>Barony of Ramshaven</option>
<option>Barony of Rising Waters</option>
<option>Barony of Septentria</option>
<option>Canton of Skeldergate</option>
<option>Barony of Skraeling Althing</option>
<option>Shire March of St. Martin</option>
<option>Stronghold of Tor Brant</option>
<option>Shire of Trinovantia Nova</option>
<option>Shire of Ulfheim</option>
<option>Canton of Vest Yorvik</option>
<option>Canton der Welfengau</option>
<option>Canton of Alderford</option>
<option>Canton of Altenberg</option>
<option>Barony of Andelcrag</option>
<option>Shire of Auenwald</option>
<option>Shire of Austrigatt</option>
<option>Shire of Aurea Ripae</option>
<option>Barony of Ayreton</option>
<option>Shire of Baile na Scolairi</option>
<option>Shire of Blackhawk</option>
<option>Canton of Brackendelve</option>
<option>Barony of Brendoken</option>
<option>Shire of Caer Gwyn</option>
<option>Barony of Carraig Ban</option>
<option>Shire of Cetus</option>
<option>Barony of Cleftlands</option>
<option>Shire of Cuil Cholium</option>
<option>Barony of Cynnabar</option>
<option>Shire of Dark River</option>
<option>Canton of Dernehealde</option>
<option>Barony of Donnershafen</option>
<option>Shire of Dragonsmark</option>
<option>Canton of Ealdnorwuda</option>
<option>Shire of Falcon's Quarry</option>
<option>Canton of Fearann na Criche</option>
<option>Barony of Fenix</option>
<option>Barony of the Flame</option>
<option>Barony of the Flaming Gryphon</option>
<option>Canton of Foxvale</option>
<option>Shire of Grenemere</option>
<option>Canton of Grey Gargoyles</option>
<option>Shire of Greyhope</option>
<option>Canton of Gwyntarian</option>
<option>Canton of Havenholde</option>
<option>Canton of Hawkes Keye</option>
<option>Riding of Hawkland Moor</option>
<option>Canton of Hrothgeirsfordr</option>
<option>Barony of Illiton</option>
<option>Canton of Lochmorrow</option>
<option>Canton March of the Marshes</option>
<option>Barony of Middle Marches</option>
<option>Canton of Mugmort</option>
<option>Shire of Mynydd Seren</option>
<option>Shire of Narrental</option>
<option>Canton of Norborough</option>
<option>Barony of North Woods</option>
<option>Canton of Oakford</option>
<option>Shire of Okenshield</option>
<option>Canton of Pferdestadt</option>
<option>Shire of Qal 'at Ja'far</option>
<option>Shire of Ravenslake</option>
<option>Canton of Rimsholt</option>
<option>Barony of Red Spears</option>
<option>Barony of Rivenstar</option>
<option>Shire of Rivenvale</option>
<option>Shire of Rivierre Constelle</option>
<option>Barony of Roaring Wastes</option>
<option>Canton of Rokkehealden</option>
<option>Shire of Runvidarstadr</option>
<option>Barony of Shadowed Stars</option>
<option>Barony of Shattered Crystal</option>
<option>College of St. Brutus</option>
<option>Shire of Starleaf Gate</option>
<option>Shire of Steren Codha</option>
<option>Barony of Sternfeld</option>
<option>Shire of Stormvale</option>
<option>Shire of Swordcliff</option>
<option>Shire of Talonval</option>
<option>Canton of Thistle</option>
<option>Canton of Three Hills</option>
<option>Canton of Three Towers</option>
<option>Canton of Tirnewydd</option>
<option>Canton of Tree Girt Sea</option>
<option>Canton of Wealdlake</option>
<option>Barony of White Waters</option>
<option>Canton of Winged Hills</option>
<option>Canton of Woods End</option>
<option>Shire of Abhainn Ciach Ghlais</option>
<option>Shire of Angel's Keep</option>
<option>College of Arx Collis</option>
<option>Shire of Ballachlagan</option>
<option>Canton of Beau Fleuve</option>
<option>Barony of Blackstone Mountain</option>
<option>Shire of Blackwater</option>
<option>Shire of Coppertree</option>
<option>Shire of Courtlandtslot</option>
<option>Barony-Marche of Debatable Lands</option>
<option>Barony of Delftwood</option>
<option>Canton of Dunloch</option>
<option>Barony of Endless Hills</option>
<option>Shire of Hartstone</option>
<option>Shire of Heronter</option>
<option>Shire of Hunter's Home</option>
<option>Shire of King's Crossing</option>
<option>Shire of Misty Highlands</option>
<option>Dominion of Myrkfaelinn</option>
<option>Shire of Nithgaard</option>
<option>Shire of Port Oasis</option>
<option>Barony of Rhydderich Hael</option>
<option>College of Silva Vulcani</option>
<option>Barony of St. Swithin’s Bog</option>
<option>Shire of Steltonwald</option>
<option>Shire of Sterlynge Vayle</option>
<option>Shire of Sunderoak</option>
<option>Shire of Sylvan Glen</option>
<option>Barony of Thescorre</option>
<option>Shire of Wyntersett</option>
<option>Barony of Aarquelle</option>
<option>Barony of al-Barran</option>
<option>Shire of Blackwater Keep</option>
<option>College of Blaiddwyn</option>
<option>Shire of Bryngolau</option>
<option>Barony of Caer Galen</option>
<option>Barony of Caerthe</option>
<option>Shire of Draca Mor</option>
<option>Barony of Dragonsspine</option>
<option>Shire of Drygestan</option>
<option>Shire of Fontaine dans Sable</option>
<option>Shire of Nahrun Kabirun</option>
<option>Shire of Plattefordham</option>
<option>Shire of Rio de las Animas</option>
<option>College of St. Golias</option>
<option>Citadel of the Southern Pass</option>
<option>Barony of Unser Hafen</option>
<option>Shire of White Mountain</option>
<option>Shire of Windkeep</option>
<option>Shire of Ardanroe</option>
<option>Barony of Axemoor</option>
<option>Shire of Blackmoor Keep</option>
<option>Shire of Caer Dun</option>
<option>Shire of Dragoun’s Weal</option>
<option>Barony of Grey Niche</option>
<option>Shire of Iron Ox</option>
<option>Shire of Loch Bais</option>
<option>Barony of Seleone</option>
<option>Shire of Tor An Riogh</option>
<option>Shire of Troll Fen</option>
<option>Shire of Vogelburg</option>
<option>Shire of Wyrmgeist</option>
<option>Shire of Al-Sahid</option>
<option>Barony of Altavia</option>
<option>Barony of the Angels</option>
<option>Barony of Calafia</option>
<option>Shire of Carreg Wen</option>
<option>Shire of Darach</option>
<option>Barony of Dreiburgen</option>
<option>Barony of Dun Or</option>
<option>Barony of Gyldenholt</option>
<option>Shire of the Isles</option>
<option>Barony of Lyondemere</option>
<option>Barony of Naevehjem</option>
<option>Barony of Nordwache</option>
<option>Barony of Starkhafn</option>
<option>Barony of Western Seas</option>
<option>Barony of Wintermist</option>
<option>Shire of Amlethsmor</option>
<option>Canton of Aston Tor</option>
<option>Shire of Axed Root</option>
<option>Shire of Calanais Nuadh</option>
<option>Shire of Carlsby</option>
<option>Barony of Coeur d’Ennui</option>
<option>Shire of Crescent Moon</option>
<option>Shire of Crystal Mynes</option>
<option>Shire of Cúm an Iolair</option>
<option>Shire of Deodar</option>
<option>Shire of Flinthyll</option>
<option>Barony of Forgotten Sea</option>
<option>Shire March of Grimfells</option>
<option>Shire of Heraldshill</option>
<option>Barony of Lonely Tower</option>
<option>Shire of Lost Moor</option>
<option>Barony of Mag Mor</option>
<option>Shire of Moonstone</option>
<option>Shire of Oakheart</option>
<option>Shire of Shadowdale</option>
<option>Shire of Spinning Winds</option>
<option>Shire of Standing Stones</option>
<option>Shire of Theobald College</option>
<option>Barony of Three Rivers</option>
<option>Barony of Vatavia</option>
<option>Shire of Villa Frumentaria</option>
<option>Shire of Westumbria</option>
<option>Shire of Wyvern Cliffe</option>
<option>Shire of Adlersruhe</option>
<option>Barony of Bjornsborg</option>
<option>Barony of Bonwicke</option>
<option>Barony of Bordermarch</option>
<option>Shire of Brad Leah</option>
<option>Barony of Bryn Gwlad</option>
<option>Canton of Chemin Noir</option>
<option>Barony of Eldern Hills</option>
<option>Barony of Elfsea</option>
<option>Shire of Ffynnon Gath</option>
<option>Canton of Glaslyn</option>
<option>Shire of Graywood</option>
<option>Stronghold of Hellsgate</option>
<option>Barony of Loch Soilleir</option>
<option>Riding of Marata</option>
<option>Province of Mooneschadowe</option>
<option>Canton of Myrgenfeld</option>
<option>Barony of Namron</option>
<option>Barony of Northkeep</option>
<option>Barony of Raven’s Fort</option>
<option>Shire of Rosenfeld</option>
<option>Shire of Seawinds</option>
<option>Shire of the Shadowlands</option>
<option>Canton of Skorragarðr</option>
<option>Barony of Stargate</option>
<option>Barony of the Steppes</option>
<option>Barony of Wiesenfeuer</option>
<option>Canton of Wyldewode</option>
<option>Barony of Arn Hold</option>
<option>Shire of Arrow's Flight</option>
<option>Barony of Bronzehelm</option>
<option>Shire of Cote du Ciel</option>
<option>Shire of Dragonmarch</option>
<option>Barony of Gryphon's Lair</option>
<option>Barony of Loch Salann</option>
<option>Barony of One Thousand Eyes</option>
<option>Shire of the River Serpent</option>
<option>Barony of Sentinels' Keep</option>
<option>Shire of Silver Keep</option>
<option>Shire of Stan Wyrm</option>
<option>Shire of Stonegate</option>
<option>Shire of Windegate</option>
<option>Shire of Ayresgarde</option>
<option>Shire of Bitter End</option>
<option>Shire of Bordergate</option>
<option>Barony of Borealis</option>
<option>Barony of Montengarde</option>
<option>Barony of Myrgan Wood</option>
<option>Shire of Sandeshend</option>
<option>Shire of Sigelhundas</option>
<option>Shire of Valley Wold</option>
<option>Shire of Vinjar</option>
<option>Shire of Windwyrm</option>
<option>Palatine Barony of Allyshia</option>
<option>Stronghold of Battle Rock</option>
<option>Shire of Belogor</option>
<option>Shire of Bestwode</option>
<option>Canton or Borderwinds</option>
<option>Shire of Caldarium</option>
<option>Shire of Canale</option>
<option>Shire of Champclair</option>
<option>Shire of Cloondara</option>
<option>Shire of Crosstor</option>
<option>Barony of Darkwood</option>
<option>Shire of Danegeld Tor</option>
<option>Shire of Earngyld</option>
<option>Barony of Eskayla</option>
<option>Stronghold of Eternal Winds</option>
<option>Palatine Barony of the Far West</option>
<option>Shire of Fendrake Marsh</option>
<option>Barony of Fettburg</option>
<option>Canton of Golden Playne</option>
<option>Province of Golden Rivers</option>
<option>Canton of Hawk's Haven</option>
<option>Shire of Hrafnafjordr</option>
<option>Fortaleza de Islas de las Velas Latinas</option>
<option>Province of the Mists</option>
<option>Shire of Mont d'Or</option>
<option>Canton of Montagne du Roi</option>
<option>Shire of Mountain's Gate</option>
<option>Shire of Pavlok Gorod</option>
<option>Shire of Ravenshore</option>
<option>Barony of Rivenoak</option>
<option>College of Saint Boniface</option>
<option>College of Saint Brendan</option>
<option>College of Saint David</option>
<option>College of Saint Guinefort</option>
<option>College of Saint Katherine</option>
<option>Barony of Selviergard</option>
<option>Province of Silver Desert</option>
<option>Province of Southern Shores</option>
<option>Barony of Tarnmist</option>
<option>Shire of Teufelberg</option>
<option>Shire of Thistletorr</option>
<option>Shire of Vakkerfjell</option>
<option>Stronghold Vale de Draco</option>
<option>Shire of Vinhold</option>
<option>Stronghold of Warrior's Gate</option>
<option>Shire of Windy Meads</option>
<option>Barony of Winter's Gate</option>
<option>Barony of the Westermark</option>
<option>Shire of Wolfscairn</option>
<option>Shire of Wuduholt be Secg</option>
'''