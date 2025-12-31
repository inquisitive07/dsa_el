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
    lyrics: []
  },

  {
    title: "Sahiba",
    artist: "Jasleen Royal",
    duration: "3:16",
    src: "assets/audio/song4.mp3",
    cover: "assets/images/song4.jpeg",
    lyrics: []
  },

  {
    title: "Song 5",
    artist: "Artist 5",
    src: "assets/audio/song5.mp3",
    cover: "assets/images/song5.jpg"
  },
  {
    title: "Song 6",
    artist: "Artist 6",
    src: "assets/audio/song6.mp3",
    cover: "assets/images/song6.jpg"
  },
  {
    title: "Song 7",
    artist: "Artist 7",
    src: "assets/audio/song7.mp3",
    cover: "assets/images/song7.jpg"
  },
  {
    title: "Song 8",
    artist: "Artist 8",
    src: "assets/audio/song8.mp3",
    cover: "assets/images/song8.jpg"
  },
  {
    title: "Song 9",
    artist: "Artist 9",
    src: "assets/audio/song9.mp3",
    cover: "assets/images/song9.jpg"
  },
  {
    title: "Song 10",
    artist: "Artist 10",
    src: "assets/audio/song10.mp3",
    cover: "assets/images/song10.jpg"
  }
];
