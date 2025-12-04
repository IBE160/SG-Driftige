## Responsiveness Strategy
### Breakpoints
| Breakpoint | Min Width | Max Width | Target Devices        |
| :--------- | :-------- | :-------- | :-------------------- |
| Mobile     | -         | 767px     | Phones                |
| Tablet     | 768px     | 1023px    | Tablets               |
| Desktop    | 1024px    | 1439px    | Laptops, smaller monitors |
| Wide       | 1440px    | -         | Large monitors        |

### Adaptation Patterns
**Layout Changes:**
- **Two-column to stacked layout:** The input and output columns will stack vertically on mobile (input on top, output below).
- **Fluid containers:** Content containers will adjust width based on screen size.

**Navigation Changes:** Not applicable for MVP due to single screen.

**Content Priority:** Input area and generated summary content are always primary.

**Interaction Changes:** Touch-friendly interactions on mobile.