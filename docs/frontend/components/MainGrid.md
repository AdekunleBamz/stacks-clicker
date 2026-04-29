# MainGrid

`MainGrid.jsx` is the interaction hub layout.

It composes:
- `InteractionStreaks`
- `ClickerCard`
- `TipJarCard`
- `QuickPollCard`

Expected props include wallet address, aggregate stats, and the three hook APIs (`clicker`, `tipjar`, `quickpoll`).
Prefer adding new cards through this layout to keep dashboard ordering explicit.

- Add new interaction cards here in a predictable order to keep keyboard navigation consistent.

- Revalidate card order assumptions before introducing new primary dashboard tiles.
