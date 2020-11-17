var splitter = new GraphemeSplitter();

function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)]
}

function uniqueCharacters(string) {
    var uniques = ''
    for(var i = 0; i < string.length; i++) {
        var c = string.charAt(i)
        if(c != '\n' && c != ' ' && uniques.indexOf(c) == -1) {
            uniques += c
        }
    }
    return uniques
}  

const patterns = {
    'fuck_trump':   "                                          \n"+
                    "      FFFFFFF UU   UU  CCCCC  KK  KK      \n"+
                    "      FF      UU   UU CC    C KK KK       \n"+
                    "      FFFF    UU   UU CC      KKKK        \n"+
                    "      FF      UU   UU CC    C KK KK       \n"+
                    "      FF       UUUUU   CCCCC  KK  KK      \n"+
                    "                                          \n"+
                    " TTTTTTT RRRRRR  UU   UU MM    MM PPPPPP  \n"+
                    "   TTT   RR   RR UU   UU MMM  MMM PP   PP \n"+
                    "   TTT   RRRRRR  UU   UU MM MM MM PPPPPP  \n"+
                    "   TTT   RR  RR  UU   UU MM    MM PP      \n"+
                    "   TTT   RR   RR  UUUUU  MM    MM PP      \n"+
                    "                                          ",
    'acab': ":::'###:::::'######:::::'###::::'########::\n"+
            "::'## ##:::'##... ##:::'## ##::: ##.... ##:\n"+
            ":'##:. ##:: ##:::..:::'##:. ##:: ##:::: ##:\n"+
            "'##:::. ##: ##:::::::'##:::. ##: ########::\n"+
            " #########: ##::::::: #########: ##.... ##:\n"+
            " ##.... ##: ##::: ##: ##.... ##: ##:::: ##:\n"+
            " ##:::: ##:. ######:: ##:::: ##: ########::\n"+
            "..:::::..:::......:::..:::::..::........:::",
    'bouquet':  "KJIGGGGGIJK\n"+
                "JJIHFFFHIJJ\n"+
                "IIHFEEEFHII\n"+
                "GHFEDDDEFHG\n"+
                "GFEDCBCDEFG\n"+
                "GFEDBABDEFG\n"+
                "GFEDCBCDEFG\n"+
                "GHFEDDDEFHG\n"+
                "IIHFEEEFHII\n"+
                "JJIHFFFHIJJ\n"+
                "KJIGGGGGIJK\n",
    'diagonal': "01234567\n"+
                "10123456\n"+
                "21012345\n"+
                "32101234\n"+
                "43210123\n"+
                "54321012\n"+
                "65432101\n"+
                "76543210",
    'wave': "   OECXBD   \n"+
            "    OECXXB  \n"+
            "      OECXB \n"+
            "      OECXB \n"+
            "    OECXXB  \n"+
            "   OECXBD   \n"+
            "  OECXBD    \n"+
            " ECXXBD     \n"+
            " CXBD       \n"+
            " CXBD       \n"+
            " ECXXBD     \n"+
            "  OECXBD    \n",
    'blm':  "          \n"+
            " BBBBB    \n"+
            " BB   B   \n"+
            " BBBBBB   \n"+
            " BB   BB  \n"+
            " BBBBBB   \n"+
            "          \n"+
            " LL       \n"+
            " LL       \n"+
            " LL       \n"+
            " LL       \n"+
            " LLLLLLL  \n"+
            "          \n"+
            " MM    MM \n"+ 
            " MMM  MMM \n"+ 
            " MM MM MM \n"+ 
            " MM    MM \n"+ 
            " MM    MM \n"+
            "          "
        }
    

var app = new Vue({
    el: '#app',
    data: {
//        text: '💗🦄🌈⛓😈✨🌅🔥🦋',
        text: '💐🌷🌸🌹🌺🌻🌼',
        random: true,
        spaceChar: '🧘🏿‍♀️',
    //      pattern: "012345\n101234\n210123\n321012\n432101\n543210"
        pattern_name: 'fuck_trump',
        pattern: ''
    },
    computed: {
        output: function() {
                this.pattern = patterns[this.pattern_name]
                var emojis = splitter.splitGraphemes(this.text)
                if(this.random) {
                    // Shuffle the emojis before using them
                    emojis = _.shuffle(emojis)
                }
                // Find all unique values in the pattern besides the newlines and spaces and create
                // a mapping to numeric indices of emojis
                var uniques = uniqueCharacters(this.pattern)
                var mapping = {}
                for(var i = 0; i < uniques.length; i++) {
                    mapping[uniques[i]] = i % emojis.length
                }
                var altar = ''
                for(var i = 0; i < this.pattern.length; i++) {
                    var patternChar = this.pattern[i]
                    if(patternChar == '\n') {
                        altar += '\n'
                    } else if(patternChar == ' ') {
                        altar += this.spaceChar
                    } else {
                        altar += emojis[mapping[patternChar]]
                    }
                }
                return altar
            }
    }
})