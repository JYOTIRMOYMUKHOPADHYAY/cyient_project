import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, CdkDragEnter, CdkDragExit, moveItemInArray} from '@angular/cdk/drag-drop';
import {Item} from "./listitem/listitem.component";

@Component({
  selector: 'app-dragdrop',
  templateUrl: './dragdrop.component.html',
  styleUrls: ['./dragdrop.component.css']
})
export class DragdropComponent implements OnInit {
  timePeriods = [
    'Bronze age',
    'Iron age',
    'Middle ages',
    'Early modern period',
    'Long nineteenth century',
  ];
  public parentItem: Item;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.timePeriods, event.previousIndex, event.currentIndex);
  }

  public get connectedDropListsIds(): string[] {
    // We reverse ids here to respect items nesting hierarchy
    return this.getIdsRecursive(this.parentItem).reverse();
  }

  constructor() {
    this.parentItem = new Item({ name: 'parent-item' });
  }

  public ngOnInit() {
    this.parentItem.children.push(new Item({
      name: 'Parent 1',
      children: [
        new Item({ name: 'Child 1' }),
        new Item({ name: 'Child 2' }),
        new Item({ name: 'Child 3' })
      ]
    }));
    this.parentItem.children.push(new Item({
      name: 'Parent 2',
      children: [
        new Item({ name: 'P Child 1' }),
        new Item({ name: 'P Child 2' }),
        new Item({
          name: 'subItem6', children: [
            new Item({ name: 'P Child 2-1' })
          ]
        })
      ]
    }));
    this.parentItem.children.push(new Item({ name: 'Parent 3' }));
  }

  public onDragDrop(event: CdkDragDrop<Item>) {
    event.container.element.nativeElement.classList.remove('active');
    if (this.canBeDropped(event)) {
      const movingItem: Item = event.item.data;
      event.container.data.children.push(movingItem);
      event.previousContainer.data.children = event.previousContainer.data.children.filter((child) => child.uId !== movingItem.uId);
    } else {
      moveItemInArray(
        event.container.data.children,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  private getIdsRecursive(item: Item): string[] {
    let ids = [item.uId];
    item.children.forEach((childItem) => { ids = ids.concat(this.getIdsRecursive(childItem)) });
    return ids;
  }

  private canBeDropped(event: CdkDragDrop<Item, Item>): boolean {
    const movingItem: Item = event.item.data;

    return event.previousContainer.id !== event.container.id
      && this.isNotSelfDrop(event)
      && !this.hasChild(movingItem, event.container.data);
  }

  private isNotSelfDrop(event: CdkDragDrop<Item> | CdkDragEnter<Item> | CdkDragExit<Item>): boolean {
    return event.container.data.uId !== event.item.data.uId;
  }

  private hasChild(parentItem: Item, childItem: Item): boolean {
    const hasChild = parentItem.children.some((item) => item.uId === childItem.uId);
    return hasChild ? true : parentItem.children.some((item) => this.hasChild(item, childItem));
  }

}
