const { React } = require('powercord/webpack')
const { TextInput } = require('powercord/components/settings')
const { RadioGroup } = require('powercord/components/settings')
const { SwitchItem } = require('powercord/components/settings')

module.exports = class Settings extends React.PureComponent {
  render() {
    return <>
      <TextInput
            defaultValue={this.props.getSetting('location', '')}
            onChange={v => this.props.updateSetting('location', v)}
        >default location</TextInput>
        <RadioGroup
            options={[
                { name: 'Metric (SI) (used by default everywhere except US)', value: "m" },
                { name: 'USCS (used by default in US)', value: "u" }
            ]}
            value={ this.props.getSetting('units', "m") }
            onChange={ e => this.props.updateSetting('units', e.value) }
        >units</RadioGroup>
        {/*enable ascii art*/}
        <SwitchItem
            value={ this.props.getSetting('asciiart', true) }
            onChange={ () => this.props.toggleSetting('asciiart') }
            >Display ascii art</SwitchItem>

            { this.props.getSetting('asciiart') === false && <RadioGroup
            options={[
                { name: '☀️ +20°C', value: 1},
                { name: '☀️ 🌡️+20°C 🌬️↗7km/h', value: 2 },
                { name: 'Location: ☀️ +20°C', value: 3 },
                { name: 'Location: ☀️ 🌡️+20°C 🌬️↗7km/h', value: 4 }
            ]}
            value={ this.props.getSetting('nonasciidisplay', 4) }
            onChange={ e => this.props.updateSetting('nonasciidisplay', e.value) }
        >display</RadioGroup> }  
    </>
  }
}