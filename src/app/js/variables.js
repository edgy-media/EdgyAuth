var config = {
    "debug": true,
}

var storage = {
    "accounts": [
      /*  {
            "id":"NASD9A98EHD90RSDF",
            "issuer":"google",
            "label":"account@gmail.com",
            "secret":"23TplPdS46Juzcyx",
            "otpauth":"asd",
            "company":"google:gmail",
            "colour":{
                "custom": true,
                "hex":"#ff0000"
            },
            "date":"Jan 25th 2019"
        },
        {
            "id":"ASDFD9A98EHQD90RSDF",
            "issuer":"discord",
            "label":"Putin",
            "secret":"f4cvu5byuly3ex7ackp64vgnaenaqodxqlrcrqrkyuvh6oh2cwsiflra",
            "otpauth":"asdf",
            "company":"discord:discord",
            "colour":{
                "custom": true,
                "hex":"#7289d9"
            },
            "date":"May 11th 2014"
        },
        {
            "id":"ASDW45TDRFG45TDFGS45T",
            "issuer":"twitter",
            "label":"xd",
            "secret":"u6x2tsmme6yuykzurlt3r3iy32xysjorh6mjo4oju7p7vzrqm7ncnagn",
            "otpauth":"wetrg",
            "company":"twitter:twitter",
            "colour":{
                "custom": true,
                "hex":"#01acec"
            },
            "date":"May 11th 2014"
        }*/
    ]
}

var app = {
    "name":"Edgy Auth",
    "accounts":{
        "defaults":{
            "colour":"#ff0000",
            "icon":"generic:red"
        }
    }
}

var NewAccont = {
    "id":"",
    "issuer":"",
    "label":"",
    "secret":"",
    "otpauth":"",
    "company":"generic:red",
    "colour":{
        "custom": false,
        "hex":"#01acec"
    },
    "date":""
}

var glob_issuer = "";
