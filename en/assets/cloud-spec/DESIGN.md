# Cloud Control Dashboard Design System

Version: Portfolio Reconstruction 1.0  
Scope: Vehicle dispatch dashboard, roadside operations dashboard, and five-camera video modal  
Reference canvas: Web 1920 × 1080 px

## 1. Design goals

This interface supports real-time monitoring of vehicles, roadside devices, maps, video, controls, and events. Its visual rules prioritize:

1. Keeping the current object clear at all times;
2. Preserving the map as the primary spatial context;
3. Using state colors only to communicate state, never as decoration;
4. Maintaining a stable left-to-right relationship between controls and real-time feedback;
5. Sharing one information hierarchy and component language across vehicle and roadside dashboards.

## 2. Evidence notes

### Confirmed by Lanhu annotations

- Canvas: 1920 × 1080 px, Web @1x / @2x;
- Vehicle dispatch dashboard, version 4, August 5, 2024;
- Vehicle roadside-operations dashboard, version 9, August 7, 2024;
- Roadside video modal, version 1, July 25, 2024;
- Information typeface: SourceHanSansCN-Regular;
- Action-button typeface: YouSheBiaoTiHei;
- Dashboard-title typeface: HYk2gj;
- See later sections for exact dimensions, color values, and positions.

### Confirmed by exported assets

- 132 exported files: 66 @1x assets and their @2x counterparts;
- Header frame: 1920 × 223 px;
- Full-height left and right frames: 692 × 1080 px;
- Small controls, buttons, status indicators, video containers, and modal backgrounds are supplied at @1x / @2x.

## 3. Color tokens

| Token | HEX | Use |
|---|---:|---|
| `surface.canvas` | `#081020` | Main dark dashboard canvas, reconstructed from delivered screens and assets |
| `surface.panel` | `#00093A` | Video-modal background; exact Lanhu value |
| `line.primary` | `#4794FF` | Selectors, video title bars, and 2 px inner borders |
| `line.modal` | `#7EB0FF` | Video-modal 2 px inner border |
| `text.primary` | `#FFFFFF` | Critical data and dashboard titles |
| `text.label` | `#A8CBFF` | Field labels and explanatory text |
| `text.table` | `#CDDFFF` | Table headers and secondary table information |
| `text.button` | `#E0E5FA` | Control-button labels |
| `data.info` | `#04A3FF` | Real-time values and informational states |
| `state.success` | `#36FF7D` | Connected and operating normally |
| `state.danger` | `#FF5656` | Danger, stop, and exception states |
| `effect.cyan` | `#31BEFF` | Active-button highlight |
| `effect.green` | `#14FF61` | Success-button highlight |

### Usage principles

- Use low-luminance blue-black for page surfaces and structural decoration;
- Use information blue for interactive boundaries and live values;
- Reserve green for success, connection, or permission to operate;
- Reserve red for danger, stop, or exception;
- Avoid large areas of bright color so maps and status indicators remain legible.

## 4. Typography

| Layer | Typeface | Size | Color | Notes |
|---|---|---:|---|---|
| Dashboard title | HYk2gj | 38 px | `#FFFFFF` → `#5CACFB` | 339 × 37 px, centered |
| Action buttons | YouSheBiaoTiHei | 20 px / 32 px | `#E0E5FA` | Strong actions and short labels |
| Critical data | SourceHanSansCN-Regular | 16 px | `#FFFFFF` / state colors | Vehicle IDs, values, and status |
| Field labels | SourceHanSansCN-Regular | 14 px | `#A8CBFF` | Field names |
| Table headers | SourceHanSansCN-Regular | 14 px | `#CDDFFF` | Data tables |

Note: module title bars are largely independent PNG decorative assets. In future reconstruction, the decorative frame can remain an image while text should become editable HTML.

## 5. Canvas and layout

- Reference canvas: 1920 × 1080 px;
- Header-frame asset: 1920 × 223 px;
- Left-side frame: 692 × 1080 px;
- Right-side frame: 692 × 1080 px;
- The central map is the flexible primary area; vehicle and roadside views maintain the same central anchor;
- The left side holds object information and controls; the right side holds state, video, and events;
- An 8 px base grid is recommended for information density, with common spacing of 8 / 16 / 24 / 32 px.

### Lanhu position samples

- Dashboard title: x 796 / y 46 / 339 × 37 px;
- Vehicle selector: x 247 / y 70 / 166 × 34 px;
- Vehicle-details title asset: x 43 / y 150 / 391 × 59 px;
- “Vehicle Name” field label: x 111 / y 251 / 58 × 13 px;
- “Connected” state: x 1555 / y 237 / 46 × 16 px.

## 6. Components

### 6.1 Selector

- Reference size: 166 × 34 px;
- Radius: 2 px;
- Inner border: 2 px;
- Primary color: `#4794FF`;
- Field labels use 14 px and selected values use 16 px;
- The drop-down arrow keeps a minimum 24 px target area.

### 6.2 Action buttons

- Type: YouSheBiaoTiHei at 20 px with 32 px line height;
- Label color: `#E0E5FA`;
- Common small-button asset: 166 × 34 px;
- State-button asset: 184 × 46 px;
- Active states may use cyan and green highlights;
- Reference outer shadow: x 2 / y 0 / blur 8 / `#053708`.

### 6.3 Status indicators

- Reference asset: 53 × 54 px;
- Green, yellow, and red represent traffic-light or equipment status only;
- Status must always have a text label; color alone is insufficient;
- Within the same component group, indicator size, spacing, and glow intensity stay consistent.

### 6.4 Module title bars

- Common exported assets: 391 × 59 px and 391 × 42 px;
- Title bars group modules and should not contain long sentences;
- Keep at least 16 px between title and content;
- Equivalent modules use the same title-bar height.

### 6.5 Tables

- Header type: SourceHanSansCN-Regular 14 px / `#CDDFFF`;
- Recommended row height: 32 px;
- Use low-opacity blue dividers;
- Avoid large opaque table surfaces so maps and video retain their luminance hierarchy.

### 6.6 Five-camera video modal

- Modal: x 339 / y 148 / 1243 × 785 px;
- Background: `#00093A`;
- Inner border: 2 px / `#7EB0FF`;
- Top-row video containers: 380 × 239 px;
- Bottom-row video containers: 288 × 182 px;
- Video title bars: 379 × 34 px, 2 px border, 2 px radius;
- Close icon: 28 × 28 px;
- The modal opens on demand rather than permanently occupying five video areas on the primary dashboard.

## 7. States and feedback

| State | Color | Example |
|---|---:|---|
| Default | `#A8CBFF` | Labels and unaccented information |
| Selected | `#4794FF` | Current vehicle, direction, or camera |
| Info | `#04A3FF` | Battery, speed, and numerical feedback |
| Success | `#36FF7D` | Connected and normal |
| Warning | Yellow indicator asset | Waiting or attention required |
| Danger | `#FF5656` | Stop, exception, or dangerous action |
| Disabled | 35%–45% opacity | Temporarily unavailable action |

Dangerous actions require color, explicit text, and secondary confirmation; red alone is not sufficient.

## 8. Maps and point clouds

- The map remains the primary spatial context for vehicles and roadside devices;
- Selecting an object updates map highlighting, details, status, and video together;
- Point-cloud luminance must not overpower critical state text;
- Routes, objects, and traffic lights remain recognizable after zooming;
- Deliver point-cloud visual parameters as color, luminance, hierarchy, and opacity values for engineering rather than static screenshots alone.

## 9. Asset delivery

- Export Web @1x and @2x versions;
- Use uncompressed PNG for glow, transparency, and complex decorative assets;
- Implement solid backgrounds, borders, text, and simple radii in code;
- Convert stretchable decorative frames into nine-slice or three-part assets rather than stretching a single image;
- Recommended asset naming:
  - `frame/header`
  - `frame/side-left`
  - `frame/side-right`
  - `control/button-primary`
  - `control/button-danger`
  - `status/light-green`
  - `status/light-yellow`
  - `status/light-red`
  - `icon/play`
  - `icon/stop`
  - `icon/close`

## 10. Engineering acceptance

- Check pixel fidelity on the 1920 × 1080 canvas;
- Check type clarity across browser zoom levels;
- Check the linkage between object selection, map highlighting, details, status, and video;
- Check that five-camera video opens and closes on demand;
- Check point-cloud rotation, zoom, and detailed rendering;
- Check normal, selected, danger, disabled, and loading states;
- Text must be selectable and replaceable; do not add new text embedded as raster images.
