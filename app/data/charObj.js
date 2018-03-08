var characters = [
    {
        name: 'test' ,
        hot: false   ,
        url: 'https://i.imgur.com/3SOg4P9.jpg'
    },
    {
        name: 'yoda' ,
        hot: false   ,
        url: 'https://vignette.wikia.nocookie.net/starwars/images/d/d6/Yoda_SWSB.png/revision/latest/scale-to-width-down/500?cb=20150206140125'
    },
    {
        name: 'luke' ,
        hot: false   ,
        url: 'https://i.pinimg.com/736x/e9/72/58/e972588dcc57d3e8391ad2a2e7596ee2--star-wars-love-star-wars-stuff.jpg'
    },
    {
        name: 'han' ,
        hot: false   ,
        url: 'https://vignette.wikia.nocookie.net/starwars/images/e/e2/TFAHanSolo.png/revision/latest/scale-to-width-down/500?cb=20160208055002'
    },
    {
        name: 'lando' ,
        hot: false   ,
        url: 'https://vignette.wikia.nocookie.net/starwars/images/8/8f/Lando_ROTJ.png/revision/latest/scale-to-width-down/500?cb=20170610183731'
    },
    {
        name: 'rey' ,
        hot: false   ,
        url: 'https://vignette.wikia.nocookie.net/starwars/images/f/f8/ReyTLJEntertainmentWeeklyNovember.png/revision/latest/scale-to-width-down/500?cb=20171119211748'
    },
    {
        name: 'poe' ,
        hot: false   ,
        url: 'https://vignette.wikia.nocookie.net/starwars/images/7/79/Poe_Dameron_TLJ.png/revision/latest/scale-to-width-down/500?cb=20180124021517'
    },
    {
        name: 'finn' ,
        hot: false   ,
        url: 'https://vignette.wikia.nocookie.net/starwars/images/a/af/Finn_TLJ_Collector%27s_Edition.png/revision/latest/scale-to-width-down/500?cb=20180124021541'
    },
    {
        name: 'windu' ,
        hot: false   ,
        url: 'https://vignette.wikia.nocookie.net/starwars/images/5/58/Mace_ROTS.png/revision/latest/scale-to-width-down/499?cb=20171107002848'
    },
    {
        name: 'amidala' ,
        hot: false   ,
        url: 'https://vignette.wikia.nocookie.net/starwars/images/b/b2/Padmegreenscrshot.jpg/revision/latest/scale-to-width-down/500?cb=20100423143631'
    },
    {
        name: 'qui-gon' ,
        hot: false   ,
        url: 'https://vignette.wikia.nocookie.net/starwars/images/6/66/Qui-Gon_Jinn_SWFB.png/revision/latest/scale-to-width-down/500?cb=20160910051518'
    },
    {
        name: 'chewbacca' ,
        hot: false   ,
        url: 'https://vignette.wikia.nocookie.net/starwars/images/4/48/Chewbacca_TLJ.png/revision/latest/scale-to-width-down/500?cb=20171231005834'
    },
    {
        name: 'r2-d2' ,
        hot: false   ,
        url: 'https://vignette.wikia.nocookie.net/starwars/images/e/eb/ArtooTFA2-Fathead.png/revision/latest/scale-to-width-down/500?cb=20161108040914'
    },
    {
        name: 'ackbar' ,
        hot: false   ,
        url: 'https://vignette.wikia.nocookie.net/starwars/images/2/29/Admiral_Ackbar_RH.png/revision/latest/scale-to-width-down/500?cb=20170907053204'
    },
    {
        name: 'leia' ,
        hot: false   ,
        url: 'https://imgur.com/deRIvua.jpg'
    },
    {
        name: 'anakin' ,
        hot: false   ,
        url: 'https://vignette.wikia.nocookie.net/starwars/images/6/6f/Anakin_Skywalker_RotS.png/revision/latest/scale-to-width-down/500?cb=20130621175844'
    },
    {
        name: 'palpatine' ,
        hot: false   ,
        url: 'https://vignette.wikia.nocookie.net/starwars/images/d/d8/Emperor_Sidious.png/revision/latest/scale-to-width-down/500?cb=20130620100935'
    },
    {
        name: 'greedo' ,
        hot: false   ,
        url: 'https://vignette.wikia.nocookie.net/starwars/images/c/c6/Greedo.jpg/revision/latest/scale-to-width-down/500?cb=20180209034210'
    },
    {
        name: 'jabba' ,
        hot: false   ,
        url: 'https://vignette.wikia.nocookie.net/starwars/images/7/7f/Jabba_SWSB.png/revision/latest/scale-to-width-down/500?cb=20160910034237'
    },
    {
        name: 'maul' ,
        hot: false   ,
        url: 'https://vignette.wikia.nocookie.net/starwars/images/5/50/Darth_Maul_profile.png/revision/latest/scale-to-width-down/499?cb=20140209162228'
    },
    {
        name: 'vader' ,
        hot: false   ,
        url: 'https://i.imgur.com/5Cya8ra.jpg'
    },
    {
        name: 'binks' ,
        hot: false   ,
        url: 'https://vignette.wikia.nocookie.net/starwars/images/d/d2/Jar_Jar_aotc.jpg/revision/latest/scale-to-width-down/500?cb=20080303052132'
    },
    {
        name: 'wicket' ,
        hot: false   ,
        url: 'https://vignette.wikia.nocookie.net/starwars/images/4/4f/Wicket_RotJ.png/revision/latest/scale-to-width-down/500?cb=20130622101905'
    },
    {
        name: 'grievous' ,
        hot: false   ,
        url: 'https://vignette.wikia.nocookie.net/starwars/images/d/de/Grievoushead.jpg/revision/latest/scale-to-width-down/500?cb=20100630082056'
    },
    {
        name: 'dooku' ,
        hot: false   ,
        url: 'https://vignette.wikia.nocookie.net/starwars/images/f/f1/Count_Dooku_headshot_gaze.jpg/revision/latest/scale-to-width-down/350?cb=20071218042012'
    },
    {
        name: 'boba' ,
        hot: false   ,
        url: 'https://vignette.wikia.nocookie.net/starwars/images/7/79/Boba_Fett_HS_Fathead.png/revision/latest/scale-to-width-down/500?cb=20161114160631'
    },
    {
        name: 'jango' ,
        hot: false   ,
        url: 'https://vignette.wikia.nocookie.net/starwars/images/5/56/JangoInfobox.png/revision/latest/scale-to-width-down/500?cb=20171106005917'
    },

]

module.exports = characters;