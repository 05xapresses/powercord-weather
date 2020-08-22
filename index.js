//btw juby is cute
const { Plugin } = require('powercord/entities')
const { get } = require('powercord/http')
const Settings = require('./Settings')

module.exports = class Weather extends Plugin {
    startPlugin() {

        powercord.api.settings.registerSettings('weather', {
            category: this.entityID,
            label: 'Weather',
            render: Settings
        })

        if (this.settings.get("asciiart", null) === null) this.settings.set("asciiart", true)

        powercord.api.commands.registerCommand({
            aliases: ["kurwapogoda", "jebacpis"],
            command: 'weather',
            description: 'checks weather',
            usage: '{c} [city/any name location/airport code/domain/area code/GPS coordinates]',
            executor: async args => {
                let location
                let req
                powercord.api.notices.sendToast('weather-toast', {
                    header: 'Getting informations', // required
                    content: "Please be patient, it's getting all the necessary data 👀",
                    type: 'info',
                    timeout: 3e3,
                    buttons: [ {
                      text: 'Ok', // required
                      color: 'green',
                      size: 'medium',
                      look: 'filled'
                    } ]
                  });
                  

                if (args.join(" ") == ""){
                    location = this.settings.get('location','')
                } else {
                    location = args.join(" ")
                }

                if (this.settings.get('asciiart', true) == false){
                    req = await get('https://wttr.in/' + encodeURIComponent(location)).query((this.settings.get('units','m')), '').query('format',(this.settings.get('nonasciidisplay',4))).query('force-ansi', '1')
                } else {
                    req = await get('https://wttr.in/' + encodeURIComponent(location)).query('0T' + (this.settings.get('units','m')), '').query('force-ansi', '1')
                } 

                if (req.statusCode != 200) return { result: 'something went wrong™️' }
                
                let result = { result: "```\n" + req.body.toString() + "\n```" }
                return result
            }
        })
    }

    pluginWillUnload() {
        powercord.api.settings.unregisterSettings('weather')
        powercord.api.commands.unregisterCommand('weather')
    }
}
