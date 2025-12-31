// Predefined pool of 10 songs for add functionality
const sampleSongs = [
  {
    title: "Rude",
    artist: "MAGIC!",
    duration: "3:45",
    src: "assets/audio/song1.mp3",
    cover: "assets/images/song1.jpeg",
    lyrics: [
      { time: 0, text: "Saturday mornin', jumped out of bed" },
      { time: 5, text: "And put on my best suit" },
      { time: 10, text: "Got in my car and raced like a jet" },
      { time: 15, text: "All the way to you" },
      { time: 20, text: "Knocked on your door with heart in my hand" },
      { time: 26, text: "To ask you a question" },
      { time: 31, text: "’Cause I know that you're an old fashioned man" },
      { time: 38, text: "Yeah" },
      { time: 43, text: "Can I have your daughter for the rest of my life?" },
      { time: 49, text: "Say yes, say yes, 'cause I need to know" },
      { time: 55, text: "You say I'll never get your blessin' 'til the day I die" },
      { time: 62, text: "Tough luck, my friend, but the answer is no" },
      { time: 69, text: "Why you gotta be so rude?" },
      { time: 73, text: "Don't you know I'm human too?" },
      { time: 78, text: "Why you gotta be so rude?" },
      { time: 82, text: "I'm gonna marry her anyway" },
      { time: 88, text: "Marry that girl, marry her anyway" },
      { time: 94, text: "Marry that girl, no matter what you say" },
      { time: 100, text: "Marry that girl, and we'll be a family" },
      { time: 106, text: "Why you gotta be so rude?" },
      { time: 112, text: "I hate to do this, you leave no choice" },
      { time: 118, text: "Can't live without her" },
      { time: 123, text: "Love me or hate me, we will be both" },
      { time: 129, text: "Standin' at that altar" },
      { time: 136, text: "Or we will run away to another galaxy" },
      { time: 143, text: "You know she's in love with me" },
      { time: 149, text: "She will go anywhere I go" },
      { time: 156, text: "Can I have your daughter for the rest of my life?" },
      { time: 163, text: "Say yes, say yes, 'cause I need to know" },
      { time: 169, text: "You say I'll never get your blessin' 'til the day I die" },
      { time: 176, text: "Tough luck, my friend, 'cause the answer's still no" },
      { time: 183, text: "Why you gotta be so rude?" },
      { time: 187, text: "Don't you know I'm human too?" },
      { time: 192, text: "Why you gotta be so rude?" },
      { time: 196, text: "I'm gonna marry her anyway" },
      { time: 202, text: "Marry that girl, no matter what you say" },
      { time: 209, text: "And we'll be a family" },
      { time: 214, text: "Why you gotta be so rude?" }
    ]
  },

  {
    title: "End of Beginning",
    artist: "Djo",
    duration: "3:39",
    src: "assets/audio/song2.mp3",
    cover: "assets/images/song2.png",
    lyrics: [
      { time: 0, text: "Just one more tear to cry" },
      { time: 5, text: "One teardrop from my eye" },
      { time: 10, text: "You better save it for the middle of the night" },
      { time: 17, text: "When things aren't black and white" },
      { time: 23, text: "Enter, Troubadour" },
      { time: 27, text: "Remember twenty-four?" },
      { time: 33, text: "And when I'm back in Chicago, I feel it" },
      { time: 39, text: "Another version of me, I was in it" },
      { time: 45, text: "I wave goodbye to the end of beginning" },
      { time: 52, text: "This song has started now" },
      { time: 57, text: "And you're just finding out" },
      { time: 62, text: "Now isn't that a laugh?" },
      { time: 66, text: "A major sacrifice" },
      { time: 72, text: "Enter, Caroline" },
      { time: 77, text: "Just trust me, you'll be fine" },
      { time: 83, text: "And when I'm back in Chicago, I feel it" },
      { time: 89, text: "Another version of me, I was in it" },
      { time: 95, text: "I wave goodbye to the end of beginning" },
      { time: 102, text: "Goodbye, goodbye, goodbye, goodbye" },
      { time: 110, text: "You take the man out of the city, not the city out the man" },
      { time: 118, text: "You take the man out of the city, not the city out the man" },
      { time: 126, text: "You take the man out of the city, not the city out the man" },
      { time: 135, text: "And when I'm back in Chicago, I feel it" },
      { time: 141, text: "Another version of me, I was in it" },
      { time: 147, text: "I wave goodbye to the end of beginning" },
      { time: 153, text: "Goodbye, goodbye" }
    ]
  },

  {
  title: "Love Me Not",
  artist: "Ravyn Lenae",
  duration: "3:32",
  src: "assets/audio/song3.mp3",
  cover: "assets/images/song3.jpeg",
  lyrics: [
    // Intro
    { time: 0, text: "See, right now, I need you, I'll meet you somewhere now" },
    { time: 6, text: "You up now, I see you, I get you, take care now" },

    // Verse 1
    { time: 13, text: "Slow down, be cool, I miss you, come here now" },
    { time: 19, text: "It's yours now, keep it, I'll hold out until now" },
    { time: 26, text: "I need you right now, once I leave you I'm strung out" },
    { time: 33, text: "If I get you, I'm slowly breaking down" },

    // Pre-Chorus
    { time: 41, text: "Oh, it's hard to see you, but I wish you were right here" },
    { time: 49, text: "Oh, it's hard to leave you when I get you everywhere" },
    { time: 57, text: "All this time I'm thinking we could never be a pair" },
    { time: 65, text: "Oh no, I don't need you, but I miss you, come here" },

    // Chorus
    { time: 74, text: "He love me not, he loves me" },
    { time: 79, text: "He holds me tight then lets me go" },
    { time: 85, text: "He love me not, he loves me" },
    { time: 90, text: "He holds me tight then lets me go" },

    // Verse 2
    { time: 100, text: "Soon as you leave me, we always lose connection" },
    { time: 107, text: "It's gettin' messy, I fiend for your affection" },
    { time: 114, text: "Don't loosen your grip, got a hold on me" },
    { time: 121, text: "Now forever, let's get back together" },

    // Bridge
    { time: 131, text: "Lord, take it so far away" },
    { time: 136, text: "I pray that God we don't break" },
    { time: 142, text: "I want you to take me up and down" },
    { time: 148, text: "And 'round and 'round again" },

    // Chorus (Repeat)
    { time: 158, text: "He love me not, he loves me" },
    { time: 163, text: "He holds me tight then lets me go" },
    { time: 169, text: "He love me not, he loves me" },
    { time: 174, text: "He holds me tight then lets me go" },

    // Outro
    { time: 186, text: "You gotta say that you're sorry at the end of the night" },
    { time: 194, text: "Wake up in the morning, everything's alright" },
    { time: 202, text: "At the end of the story, you're holdin' me tight" },
    { time: 210, text: "I don't need to worry, am I out of my mind?" },

    { time: 220, text: "Oh, it's hard to see you, but I wish you were right here" },
    { time: 228, text: "Oh, it's hard to leave you when I get you everywhere" },
    { time: 236, text: "All this time I'm thinking I'm strong enough to sink it" },
    { time: 244, text: "Oh no, I don't need you, but I miss you, come here" }
  ]
},

  {
    title: "Sahiba",
    artist: "Jasleen Royal",
    duration: "3:16",
    src: "assets/audio/song4.mp3",
    cover: "assets/images/song4.jpeg",
    lyrics: [
      { time: 0, text: "Sahiba, aaye ghar kaahe na? Aise to sataaye na" },
      { time: 7, text: "Dekhu tujhko, chain aata hai" },

      { time: 16, text: "Sahiba, neende-veende aaye na, raate kaati jaaye na" },
      { time: 25, text: "Tera hi khayal din-rain aata hai" },

      { time: 36, text: "Sahiba, samundar, meri aankhon me reh gaye" },
      { time: 45, text: "Hum aate-aate jaana, teri yaadon me reh gaye" },
      { time: 54, text: "Ye palke gawahi hai, hum raaton me reh gaye" },
      { time: 63, text: "Jo vaade kiye saare, bas baaton me reh gaye" },

      { time: 73, text: "Baato-baato me hi, khwabon me hi mere qareeb hai tu" },
      { time: 83, text: "Teri talab mujhko, jaana, ho to kabhi ru-ba-ru" },

      { time: 95, text: "Mere sahiba, dil na kiraaye ka, thoda to sambhalo na" },
      { time: 104, text: "Nazuk hai yeh, toot jaata hai" },

      { time: 114, text: "Sahiba, neende-veende aaye na, raate kaati jaaye na" },
      { time: 123, text: "Tera hi khayal din-rain aata hai" },

      { time: 134, text: "Kaise bhala shab hogi vo, sang jo tere dhalti hai?" },
      { time: 143, text: "Dil ko koi khwahish nahi, teri kami khalti hai" },
      { time: 152, text: "Aaraam na ab aankhon ko, khwaab bhi na badalti hai" },
      { time: 161, text: "Dil ko koi khwahish nahi, teri kami jaana khalti hai" }
    ]
  },

  {
  title: "Kesariya",
  artist: "Arijit Singh",
  duration: "4:28",
  src: "assets/audio/song5.mp3",   // update filename as per your project
  cover: "assets/images/song5.jpg",
  lyrics: [
    // Verse 1
    { time: 0, text: "Mujhko itna bataaye koyi" },
    { time: 6, text: "Kaise tujh se dil na lagaaye koyi" },
    { time: 12, text: "Rabba ne tujhko banaane mein" },
    { time: 17, text: "Kar di hain husn ki khaali tijoriyaan" },

    // Pre-Chorus
    { time: 25, text: "Kaajal ki siyaahi se likhi" },
    { time: 30, text: "Hain tune jaane kitno ki love storiyan" },

    // Chorus
    { time: 36, text: "Kesariya tera ishq hai, piya" },
    { time: 41, text: "Rang jaaun jo main haath lagaaun" },
    { time: 47, text: "Din beete saara teri fikr mein" },
    { time: 53, text: "Rain saari teri khair manaaun" },

    // Chorus Repeat
    { time: 62, text: "Kesariya tera ishq hai, piya" },
    { time: 67, text: "Rang jaaun jo main haath lagaaun" },
    { time: 73, text: "Din beete saara teri fikr mein" },
    { time: 79, text: "Rain saari teri khair manaaun" },

    // Verse 2
    { time: 92, text: "Patjhad ke mausam mein bhi rangi chanaaron jaisi" },
    { time: 101, text: "Jhanke sannaaton mein tu veena ke taaron jaisi" },
    { time: 110, text: "Sadiyon se bhi lambi ye mann ki amaavasein hain" },
    { time: 119, text: "Aur tu phuljhadiyon waale tyohaaron jaisi" },

    // Pre-Chorus 2
    { time: 130, text: "Chanda bhi deewaana hai tera" },
    { time: 136, text: "Jalti hain tujhse saari chakoriyaan" },
    { time: 142, text: "Kaajal ki siyaahi se likhi" },
    { time: 147, text: "Hain tune jaane kitnon ki love storiyan" },

    // Chorus
    { time: 154, text: "Kesariya tera ishq hai, piya" },
    { time: 159, text: "Rang jaaun jo main haath lagaaun" },
    { time: 165, text: "Din beete saara teri fikr mein" },
    { time: 171, text: "Rain saari teri khair manaaun" },

    // Outro
    { time: 184, text: "Kesariya tera ishq hai, piya, ishq hai, piya" },
    { time: 191, text: "Piya, ishq hai, piya, ishq hai, piya" },
    { time: 198, text: "Kesariya tera ishq hai, piya" },
    { time: 204, text: "Rang jaaun jo main haath lagaaun" }
  ]
},
  {
  title: "Kabira",
  artist: "Tochi Raina, Rekha Bhardwaj",
  duration: "3:44",
  src: "assets/audio/song6.mp3",   // change filename if needed
  cover: "assets/images/song6.jpg",
  lyrics: [
    // Intro / Banno Verse
    { time: 0, text: "Banno re banno meri chali sasural ko" },
    { time: 6, text: "Akhiyon mein pani de gayi" },
    { time: 11, text: "Dua mein miththi gudd dhaani le gayi" },

    { time: 18, text: "Banno re banno meri chali sasural ko" },
    { time: 24, text: "Akhiyon mein pani de gayi" },
    { time: 29, text: "Dua mein miththi gudd dhaani le gayi" },

    // Chorus
    { time: 38, text: "Re Kabira maan jaa" },
    { time: 42, text: "Re Faqeera yun na jaa" },
    { time: 47, text: "Aaja tujhko pukaare teri parchhaaiyan" },

    { time: 54, text: "Re Kabira maan jaa" },
    { time: 58, text: "Re Faqeera yun na jaa" },
    { time: 63, text: "Kaisa tu hai nirmohi, kaisa harjaaiya" },

    // Hook Chant
    { time: 72, text: "Re Kabira, Re Kabira" },
    { time: 76, text: "Re Fakeera, Re Fakeera" },
    { time: 81, text: "Re Kabira, Re Kabira" },
    { time: 86, text: "Re Fakeera, Re Fakeera" },

    // Verse 2
    { time: 96, text: "Tooti chaarpai wohi thandi purvaai rasta dekhe" },
    { time: 105, text: "Doodhon ki malaai wohi mitti ki suraahi rasta dekhe" },

    { time: 114, text: "Tooti chaarpai wohi thandi purvaai rasta dekhe" },
    { time: 123, text: "Doodhon ki malaai wohi mitti ki suraahi rasta dekhe" },

    // Gudiya Verse
    { time: 132, text: "Gudiya ri gudiya tera gudda perdesiya" },
    { time: 139, text: "Jodi aasmani ho gayi" },
    { time: 144, text: "Shagun pe dekho shaad maani ho gayi" },

    { time: 152, text: "Gudiya ri gudiya tera gudda perdesiya" },
    { time: 159, text: "Jodi aasmani ho gayi" },
    { time: 164, text: "Shagun pe dekho shaad maani ho gayi" },

    // Final Chorus
    { time: 172, text: "Re Kabira maan jaa" },
    { time: 176, text: "Re Faqeera yun na jaa" },
    { time: 181, text: "Aaja tujhko pukaare teri parchhaaiyan" },

    { time: 188, text: "Re Kabira maan jaa" },
    { time: 192, text: "Re Faqeera yun na jaa" },
    { time: 197, text: "Kaisa tu hai nirmohi, kaisa harjaaiya" },

    // Outro
    { time: 208, text: "Re Kabira, Re Kabira" },
    { time: 214, text: "Re Fakeera, Re Fakeera" }
  ]
},
  {
  title: "Subhanallah",
  artist: "Sreerama Chandra",
  duration: "4:10",
  src: "assets/audio/song7.mp3",   // adjust filename if needed
  cover: "assets/images/song7.jpeg",
  lyrics: [
    // Verse 1
    { time: 0, text: "Ek din kabhi jo khud ko taraashe" },
    { time: 6, text: "Meri nazar se tu zara" },
    { time: 11, text: "Aankhon se teri kya kya chhupa hai" },
    { time: 17, text: "Tujhko dikhaaoon main zara" },

    // Pre-Chorus
    { time: 24, text: "Ek ankahi si daastaan daastaan" },
    { time: 30, text: "Kehne lagega aaina" },

    // Chorus
    { time: 36, text: "Subhanallah" },
    { time: 40, text: "Jo ho raha hai pehli dafa hai" },
    { time: 46, text: "Wallah aisa hua" },

    { time: 53, text: "Subhanallah" },
    { time: 57, text: "Jo ho raha hai pehli dafa hai" },
    { time: 63, text: "Wallah aisa hua" },

    // Verse 2
    { time: 72, text: "Meri khaamoshi se baatein chun lena" },
    { time: 79, text: "Unki dori se taareefein bun lena" },

    { time: 87, text: "Meri khaamoshi se baatein chun lena" },
    { time: 94, text: "Unki dori se taareefein bun lena" },

    // Bridge
    { time: 103, text: "Kal nahi thi jo aaj lagti hoon" },
    { time: 109, text: "Taareef meri hai khaamakhaan" },
    { time: 115, text: "Tohfa hai tera meri adaa" },

    // Verse 3
    { time: 123, text: "Ek din kabhi jo khud ko pukaare" },
    { time: 129, text: "Meri zubaan se tu zara" },
    { time: 134, text: "Tujh mein chhupi si jo shayari hai" },
    { time: 140, text: "Tujhko sunaaoon main zara" },

    // Pre-Chorus 2
    { time: 147, text: "Ye do dilon ka vaasta vaasta" },
    { time: 153, text: "Khul ke bataaya jaaye na" },

    // Final Chorus / Outro
    { time: 160, text: "Subhanallah" },
    { time: 164, text: "Jo ho raha hai pehli dafa hai" },
    { time: 170, text: "Wallah aisa hua" },

    { time: 176, text: "Wallah aisa hua" },
    { time: 182, text: "Wallah aisa hua" },
    { time: 188, text: "Wallah aisa hua" }
  ]
},
  {
  title: "Sooraj Dooba Hain",
  artist: "Arijit Singh, Aditi Singh Sharma",
  duration: "4:24",
  src: "assets/audio/song8.mp3",   // update filename if needed
  cover: "assets/images/song8.jpeg",
  lyrics: [
    // Intro / Verse 1
    { time: 0, text: "Matlabi ho ja zara matlabi" },
    { time: 6, text: "Duniya ke sunta hai kyun" },
    { time: 11, text: "Khud ke bhi sun le kabhi" },

    { time: 18, text: "Matlabi ho ja zara matlabi" },
    { time: 24, text: "Duniya ke sunta hai kyun" },
    { time: 29, text: "Khud ke bhi sun le kabhi" },

    // Pre-Chorus
    { time: 37, text: "Kuch baat ghalat bhi ho jaaye" },
    { time: 43, text: "Kuch der ye dil bhi kho jaaye" },
    { time: 49, text: "Befikr dhadkane is tarah se chale" },
    { time: 56, text: "Shor gunje yahan se wahan" },

    // Chorus
    { time: 64, text: "Sooraj dooba hai yaaro" },
    { time: 69, text: "Do ghoont nashe ke maaro" },
    { time: 75, text: "Raste bhula do saare gharbaar ke" },

    { time: 82, text: "Sooraj dooba hai yaaro" },
    { time: 87, text: "Do ghoont nashe ke maaro" },
    { time: 93, text: "Hum tum bhula do saare sansaar ke" },

    // English Hook
    { time: 101, text: "Ask me for anything" },
    { time: 105, text: "I can give you everything" },

    { time: 111, text: "Ask me for anything" },
    { time: 115, text: "I can give you everything" },

    // Verse 2
    { time: 123, text: "Aata pata rahe na kisi ka humein" },
    { time: 130, text: "Yehi kahe ye pal zindagi ka humein" },

    { time: 138, text: "Aata pata rahe na kisi ka" },
    { time: 143, text: "Yehi kahe ye pal zindagi ka" },

    // Bridge
    { time: 151, text: "Khudgarz si khwahish liye" },
    { time: 157, text: "Besaas bhi hum tum jiye" },
    { time: 163, text: "Hai gulaabi gulaabi samaa" },

    // Chorus Repeat
    { time: 170, text: "Sooraj dooba hai yaaro" },
    { time: 175, text: "Do ghoont nashe ke maaro" },
    { time: 181, text: "Raste bhula do saare gharbaar ke" },

    { time: 188, text: "Sooraj dooba hai yaaro" },
    { time: 193, text: "Do ghoont nashe ke maaro" },
    { time: 199, text: "Hum tum bhula do saare sansaar ke" },

    // Verse 3
    { time: 208, text: "Chale nahi ude aasmaan pe abhi" },
    { time: 214, text: "Pata na ho hai jaana kahan pe abhi" },

    { time: 221, text: "Ke bemanzile ho sab raaste" },
    { time: 227, text: "Duniya se ho zara faasle" },
    { time: 233, text: "Kuch khud se bhi ho dooriyaan" },

    // Final Chorus
    { time: 240, text: "Sooraj dooba hai yaaro" },
    { time: 245, text: "Do ghoont nashe ke maaro" },
    { time: 251, text: "Hum tum bhula do saare sansaar ke" },

    // Outro
    { time: 260, text: "Ask me for anything" },
    { time: 264, text: "I can give you everything" }
  ]
},
  {
  title: "London Thumakda",
  artist: "Labh Janjua, Sonu Kakkar, Neha Kakkar",
  duration: "4:22",
  src: "assets/audio/song9.mp3",   // update filename if needed
  cover: "assets/images/song9.jpg",
  lyrics: [
    // Intro / Verse 1
    { time: 0, text: "Tu ho gayi one to two, oh kudiye" },
    { time: 6, text: "What to do, oh ho gayi munde di" },
    { time: 12, text: "Pataanga wargi tu aivein ud di" },
    { time: 18, text: "Oh ho gayi munde di" },

    // Verse 2
    { time: 25, text: "Heela de chaldi took took tu" },
    { time: 31, text: "Kardi make up tu, kardi yaar" },
    { time: 37, text: "Angrezi padhdi, ghit pit tu" },
    { time: 43, text: "Kardi gym queen saadi Victoria" },

    // Chorus
    { time: 51, text: "Tu kanti big ban di" },
    { time: 55, text: "Poora London thumakda" },
    { time: 60, text: "Oh jaddo nachche pehn di" },
    { time: 65, text: "Poora London thumakda" },

    { time: 72, text: "Tu kanti big ban di" },
    { time: 76, text: "Poora London thumakda" },
    { time: 81, text: "Oh jaddo nachche pehn di" },
    { time: 86, text: "Poora London thumakda" },

    // Verse 3
    { time: 96, text: "Latte di chadar ute honeymoon kar mahiya" },
    { time: 104, text: "Aavo saamne aavo saamne, tera ki size hai dass mahiya" },
    { time: 113, text: "Malmal ka kurda dikh jaaye" },
    { time: 118, text: "Sab kuch clear mahiya" },

    { time: 125, text: "Tere saamne lagda hai chhota palang mahiya" },

    // Fun Interlude
    { time: 134, text: "Oye hoye hoye, death hi ho gayi" },
    { time: 140, text: "Loudspeaker de, Madonna lagdi" },

    // Chorus Repeat
    { time: 150, text: "Tu kanti big ban di" },
    { time: 154, text: "Poora London thumakda" },
    { time: 159, text: "Oh jaddo nachche pehn di" },
    { time: 164, text: "Poora London thumakda" },

    { time: 171, text: "Tu kanti big ban di" },
    { time: 175, text: "Poora London thumakda" },
    { time: 180, text: "Oh jaddo nachche pehn di" },
    { time: 185, text: "Poora London thumakda" },

    // Punjabi Hook
    { time: 195, text: "Seedhi gilaasi rakh, London thumakda" },
    { time: 201, text: "Punjabi style vich, London thumakda" },
    { time: 207, text: "Lassi da gilaas khinch, London thumakda" },

    // Outro / Chant
    { time: 215, text: "Thumakda thumakda London thumakda" },
    { time: 221, text: "Oye wah ji wah" },
    { time: 226, text: "Tunakda tunakda" },
    { time: 231, text: "Oye balle" }
  ]
},
  {
  title: "Othaiyadi Pathayila",
  artist: "Dhibu Ninan Thomas",
  duration: "4:05",
  src: "assets/audio/song10.mp3",   // update if filename differs
  cover: "assets/images/song10.webp",
  lyrics: [
    // Intro / Verse 1
    { time: 0, text: "Othaiyadi pathayila, thaavi oduren" },
    { time: 7, text: "Aththai peththa poonguyila, thedi vaaduren" },

    { time: 16, text: "Santhana malai alluthu aala, vaasam yeruthu" },
    { time: 23, text: "En kili mela sangili pola, sera thonuthu" },

    { time: 31, text: "Sakkarai aala sokkuthu aala" },
    { time: 36, text: "Maalai maatha maman varattumma" },

    // Musical / Hook
    { time: 44, text: "Kanmaniyae" },

    // Verse 2
    { time: 55, text: "Vazhiyila pootha saamanthi neeyae" },
    { time: 62, text: "Vizhiyila sertha poongothu neeyae" },

    { time: 70, text: "Adiyae adiyae poongodiyae" },
    { time: 75, text: "Kavalai marakkum thaai madiyae" },

    { time: 82, text: "Azhagae azhagae pen azhagae" },
    { time: 87, text: "Tharayil nadakkum therazhagae" },

    // Pre-Chorus
    { time: 96, text: "Nizhalaattam pinnala naan odi vanthenae" },
    { time: 104, text: "Oru vaatti ennai paaren maa" },

    // Chorus Repeat
    { time: 112, text: "Othaiyadi pathayila, thaavi oduren" },
    { time: 119, text: "Aththai peththa poonguyila, thedi vaaduren" },

    // Music Break
    { time: 130, text: "(Music)" },

    // Verse 3
    { time: 144, text: "Palamurai neeyum paarkaama pona" },
    { time: 151, text: "Irumbukku mela thuruvena aana" },

    { time: 159, text: "Usura unakkae nendhu vitten" },
    { time: 165, text: "Irunthum nerunga bayanthu kitten" },

    { time: 173, text: "Uyirae uyirae en uyirae" },
    { time: 179, text: "Ulagam neethan vaa uyirae" },

    // Pre-Chorus 2
    { time: 187, text: "Manasellam kannadi odaikatha panthadi" },
    { time: 195, text: "Vathaikatha kannae kanmaniyae" },

    // Final Chorus
    { time: 204, text: "Othaiyadi pathayila, thaavi oduren" },
    { time: 211, text: "Aththai peththa poonguyila, thedi vaaduren" },

    // Outro
    { time: 222, text: "Nenjula veesum kanmani vaasam, kaattu senbagamae" },
    { time: 231, text: "Paravai pola paranthu poga, kooda sernthu neeyum vaaruviya" },
    { time: 241, text: "Kanmaniyae" }
  ]
}
];
