//btw juby is cute
const { Plugin } = require('powercord/entities')
const { get } = require('powercord/http')

module.exports = class TextReact extends Plugin {
    startPlugin() {

        powercord.api.commands.registerCommand({
            aliases: ["kurwapogoda", "jebacpis"],
            command: 'weather',
            description: 'checks weather',
            usage: '{c} [city/any name location/airport code/domain/area code/GPS coordinates]',
            executor: async args => {
                const req = await get('https://wttr.in/' + encodeURIComponent(args.join(' '))).query('0T', '').query('force-ansi', '1')
                if (req.statusCode != 200) return { result: 'something went wrong™️' }
                
                let result = { result: "```\n" + req.body.toString() + "\n```" }
                return result 
            }
        })
    }

    pluginWillUnload() {
        powercord.api.commands.unregisterCommand('weather')
    }
}
