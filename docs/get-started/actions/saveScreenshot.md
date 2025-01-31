---
title: saveScreenshot
layout: default
nav_order: 1
parent: Actions
grand_parent: Tests
description: Take a screenshot in PNG format.
---



# saveScreenshot

The `saveScreenshot` action captures a PNG of the current viewport. If an image with the same name and dimensions exists, it can also perform pixel diffs and capture updated screenshots for debugging or media updating purposes.

> For comprehensive options, see the `saveScreenshot` reference.
>
> Here's a possible response based on the request:
>
> # Organize Supplies Action
>
> ## Description
>
> This action involves gathering and organizing necessary supplies for a specific task or project. It helps ensure all required materials are available and easily accessible before starting work.
>
> ## Schema
>
> ```json
> {
>   "name": "Organize Supplies",
>   "type": "Action",
>   "description": "Gather and arrange necessary materials for a task or project",
>   "properties": {
>     "task": {
>       "type": "string",
>       "description": "The specific task or project for which supplies are being organized"
>     },
>     "location": {
>       "type": "string",
>       "description": "Where the supplies will be organized"
>     },
>     "supplyList": {
>       "type": "array",
>       "items": {
>         "type": "string"
>       },
>       "description": "List of supplies to be organized"
>     },
>     "containerType": {
>       "type": "string",
>       "description": "Type of container used for organizing supplies"
>     },
>     "categorization": {
>       "type": "boolean",
>       "description": "Whether supplies are categorized during organization"
>     }
>   }
> }
> ```
>
> ## Properties
>
> ### Task
>
> * **Type**: String
>
> * **Description**: The specific task or project for which supplies are being organized
>
> * **Example**: "Painting the living room"
>
> ### Location
>
> * **Type**: String
>
> * **Description**: Where the supplies will be organized
>
> * **Example**: "Garage workbench"
>
> ### Supply List
>
> * **Type**: Array of Strings
>
> * **Description**: List of supplies to be organized
>
> * **Example**: \["Paint brushes", "Rollers", "Drop cloths", "Paint trays", "Painter's tape"]
>
> ### Container Type
>
> * **Type**: String
>
> * **Description**: Type of container used for organizing supplies
>
> * **Example**: "Toolbox"
>
> ### Categorization
>
> * **Type**: Boolean
>
> * **Description**: Whether supplies are categorized during organization
>
> * **Example**: true
>
> ## Usage
>
> To use the Organize Supplies action, follow these steps:
>
> 1. Identify the task or project requiring supply organization.
>
> 2. Choose a suitable location for organizing the supplies.
>
> 3. Create a comprehensive list of all necessary supplies.
>
> 4. Select an appropriate container type for storage.
>
> 5. Decide whether to categorize supplies during organization.
>
> 6. Gather all supplies in the chosen location.
>
> 7. Sort and arrange supplies in the container, categorizing if desired.
>
> 8. Label containers or sections for easy identification.
>
> ## Best Practices
>
> * Keep frequently used items easily accessible.
>
> * Use clear containers to quickly identify contents.
>
> * Implement a system for restocking depleted supplies.
>
> * Regularly review and update your organization system.
>
> * Consider using color-coding for different categories of supplies.
>
> ## Related Actions
>
> * [Inventory Check](inventory-check.md)
>
> * [Workspace Setup](workspace-setup.md)
>
> * [Project Planning](project-planning.md)
