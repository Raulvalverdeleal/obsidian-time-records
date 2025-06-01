import { App, Editor, MarkdownView, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { getDateString, handleTimeRecordsMatch } from 'helpers';

interface ObsidianTimeRecordsSettings {
    prefix: string
    dev: boolean
}

const DEFAULT_SETTINGS: ObsidianTimeRecordsSettings = {
    prefix: 'T',
    dev: false,
}

export default class ObsidianTimeRecords extends Plugin {
    settings: ObsidianTimeRecordsSettings

    async onload() {

        await this.loadSettings();
        const prefix = this.settings.prefix || "T"

        this.registerMarkdownPostProcessor((element, context) => {
            const regex = new RegExp(`${prefix}\\(\\s*(.*?)\\s*\\)`,'g')

            const textNodes = Array.from(element.querySelectorAll('*:not(pre):not(code)')).flatMap(el => Array.from(el.childNodes))

            for (let i = 0; i < textNodes.length; i++) {

                const node = textNodes[i]
                if (!node || node.nodeType !== Node.TEXT_NODE || !node.textContent) continue

                const matches = node.textContent.matchAll(regex)

                let replacedText = node.textContent
                for (const match of matches) {

                    const [fullMatch, timeRecord] = match
                    console.log(`TR Match: ${fullMatch} -> ${timeRecord}`)
                    const formattedDuration = handleTimeRecordsMatch(timeRecord)
                    replacedText = replacedText.replace(fullMatch, formattedDuration)
                }

                if (replacedText !== node.textContent) {
                    node.textContent = replacedText
                }
            }
        })

        this.addCommand({
			id: 'tm-insert-time-record',
			name: 'Insert time record',
			editorCallback: (editor: Editor, view: MarkdownView) => {

                const cursorPosition = editor.getCursor()
                const textToInsert = `${prefix}()`
        
                editor.replaceRange(textToInsert, cursorPosition)
        
                const newCursorPosition = {
                    line: cursorPosition.line,
                    ch: cursorPosition.ch + textToInsert.indexOf('()') + 1,
                }

                editor.setCursor(newCursorPosition);
			}
		})

        this.addCommand({
			id: 'tm-insert-date-time',
			name: 'Insert the current date and time',
			editorCallback: (editor: Editor, view: MarkdownView) => {

                const cursorPosition = editor.getCursor()
                const textToInsert = getDateString(new Date())
        
                editor.replaceRange(textToInsert, cursorPosition)
        
                const newCursorPosition = {
                    line: cursorPosition.line,
                    ch: cursorPosition.ch + textToInsert.length,
                }

                editor.setCursor(newCursorPosition);
			}
		})

        this.addSettingTab(new SampleSettingTab(this.app, this))
    }

    onunload() {}

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings)
    }
}

class SampleSettingTab extends PluginSettingTab {
    plugin: ObsidianTimeRecords

    constructor(app: App, plugin: ObsidianTimeRecords) {
        super(app, plugin)
        this.plugin = plugin
    }

    display(): void {
        const { containerEl } = this

        containerEl.empty()

        new Setting(containerEl)
            .setName('Time record prefix')
            .setDesc('The string before the timestamps')
            .addText(text => text
                .setPlaceholder('"T" as default')
                .setValue(this.plugin.settings.prefix)
                .onChange(async (value) => {
                    this.plugin.settings.prefix = value
                    await this.plugin.saveSettings()
                }))

        new Setting(containerEl)
            .setName('Dev logs')
            .setDesc('Show useful debugging logs in the console')
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.dev)
                .onChange(async (value) => {
                    this.plugin.settings.dev = value
                    await this.plugin.saveSettings()
                }))
    }
}