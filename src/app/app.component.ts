import { Component } from '@angular/core';
import { CategoryAxis, NoteHoverEvent } from '@progress/kendo-angular-charts';
import { Align, Margin } from '@progress/kendo-angular-popup';
import { geometry, Group, Text } from '@progress/kendo-drawing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public showTooltip = false;
  public tooltipOffset: Margin;
  public tooltipContent: string;

  public readonly anchorAlign: Align = {
    horizontal: 'left',
    vertical: 'top'
  }

  public readonly data = [
    2,
    4,
    6,
    8,
    10,
    12,
    14,
    16,
    18,
    20,
    22,
    24,
  ];

  public readonly categoryAxis: CategoryAxis = {
    labels: {
      background: '#ffffffde',
      position: 'onAxis',
      color: '#232323',
      font: '12px "Open Sans"'
    },
    notes: {
      visual: e => {
        const group = new Group({ zIndex: 2 } as any);
        const availableSpaceMidPointX = e.rect.size.width / 2;
        const notificationLeft = e.rect.origin.x;
        const notificationTop = (e.sender.chartArea?.height ?? e.rect.origin.y) + 10;
        const iconHorizontalPosition = notificationLeft + availableSpaceMidPointX - 10 / 2;

        const position1 = new geometry.Point(iconHorizontalPosition, notificationTop + 10);
        group.append(this.getIcon(position1));
        const position2 = new geometry.Point(iconHorizontalPosition, notificationTop + 20);
        group.append(this.getIcon(position2));

        return group;
      },
      data: [
        { value: 3 },
        { value: 8 },
      ]
    },
    justified: true,
  };

  public noteHover(e: NoteHoverEvent): void {
    const rect = (e.visual as Group).bbox();
    const noteWidth = rect.getSize().width;
    const y = rect.bottomLeft().getY() + 10;
    const x = rect.bottomLeft().getX() - (noteWidth / 2);
    this.tooltipOffset = { vertical: y, horizontal: x };
    this.tooltipContent = 'Tooltip text';
    this.showTooltip = true;
  }

  public noteLeave(): void {
    this.showTooltip = false;
  }

  private getIcon(position: geometry.Point): Text {
    const font = '13px "Open Sans"';
    const character = '▲';
    return new Text(character, position, {
      fill: {
        color: 'black',
      },
      font: `${font}`,
    });
  }
}
