# Time Records Plugin for Obsidian
The Time Records Plugin is an Obsidian plugin that allows you to easily manage and insert time records into your notes using a simple and flexible syntax. Whether you want to assign dedicated time to projects, track events, or log time periods, this plugin provides an intuitive interface and powerful features.

---
## Features
1. Configurable Prefix: Define your custom prefix for time records (e.g., T).
2. Simple Syntax:
	- Single Time Record: `T(yyyy-mm-dd hh:mm...yyyy-mm-dd hh:mm)`
	- Multiple Time Records: `T(yyyy-mm-dd hh:mm...yyyy-mm-dd hh:mm + yyyy-mm-dd hh:mm...yyyy-mm-dd hh:mm)`
	- Periods are joined by `...`, and multiple periods are separated by `+`.
3. Convenient Commands:
	- Insert an empty time record: `[prefix]()`. Example: `T()`
	- Insert the current date and time: `yyyy-mm-dd hh:mm`.
---
## Syntax Overview
### 1. Empty Time Record:
```
T()
```
> Placeholder for future records.
### 2. Single Time Record:
```
T(2025-06-01 12:00...2025-06-01 14:00)
```
> Represents a time period from 12:00 PM to 2:00 PM on June 1, 2025.

### 3. Multiple Time Records:
```
T(2025-06-01 12:00...2025-06-01 14:00 + 2025-06-02 10:00...2025-06-02 11:00)
```
> Represents two time periods:
>- 12:00 PM to 2:00 PM on June 1, 2025.
>- 10:00 AM to 11:00 AM on June 2, 2025.
---
## Commands

1. Insert Empty Time Record:
	- Shortcut: (your custom mapping).
	- Example output: T()
2. Insert Current Date and Time:
	- Shortcut: (your custom mapping).
	- Example output: T(2025-06-01 15:30)
---
## How to Use

1. Install the Plugin:
	- Download and place the plugin in your Obsidian plugins folder.
	- Enable it in Obsidian's plugin settings.
2. Configure the Prefix:
	- Go to the plugin settings and set your preferred prefix (default is `T`).
3. Insert Time Records:
	- Use the commands or manually type using the syntax above.
4. Edit Time Records:
	- Manually change de date time value keeping a valid format.
	- Use other useful plugins as: [datepicker-plugin](https://github.com/joycode-hub/datepicker-plugin)
---
## Contribution
Feel free to contribute to the plugin by:
- Reporting issues.
- Suggesting new features.
- Submitting pull requests.
