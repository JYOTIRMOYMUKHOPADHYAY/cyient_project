import { A11yModule } from '@angular/cdk/a11y';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Item } from './listitem/listitem.component';



class item {
  name: String;
  desc: String;
  isRunning: boolean;
  isCompleted: boolean;
  hasError: boolean;
  nextNode: number;
  preNode: any;
}

@Component({
  selector: 'app-dragdrop',
  templateUrl: './dragdrop.component.html',
  styleUrls: ['./dragdrop.component.css']
})
export class DragdropComponent implements OnInit {
  public parentItem: Item;
  globalCounter = 0;
  jsPlumbInstance;
  onNext = false;
  tempX = 0;
  tempY = 0;
  x: any = 0;
  show: boolean = true;
  processCompleted = false;
  timePeriods = [
    'Bronze age',
    'Iron age',
    'Middle ages',
    'Early modern period',
    'Long nineteenth century',
  ];
  nodes1 = [{
    id: 1,
    name: "Cluster grouping",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    isRunning: false,
    isCompleted: false,
    hasError: false,
    nextNode: 2,
    preNode: null,
    dragPosition: {
      x: 310,
      y: null,
    }
  },
  {
    id: 2,
    name: "Node Boundary ",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    isRunning: false,
    isCompleted: false,
    hasError: false,
    nextNode: 3,
    preNode: 1,
    dragPosition: {
      x: 310,
      y: null,
    }
  },
  {
    id: 3,
    name: "Node Placements",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    isRunning: false,
    isCompleted: false,
    hasError: false,
    nextNode: 4,
    preNode: 2,
    dragPosition: {
      x: 310,
      y: null,
    }
  },
  {
    id: 4,
    name: "Cluster Corrections",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    isRunning: false,
    isCompleted: false,
    hasError: false,
    nextNode: 5,
    preNode: 3,
    dragPosition: {
      x: 310,
      y: null,
    }
  },
  {
    id: 5,
    name: "Cluster Corrections",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    isRunning: false,
    isCompleted: false,
    hasError: false,
    nextNode: null,
    preNode: 4,
    dragPosition: {
      x: 310,
      y: null,
    }
  }]
  nodes2 = []
  flag = 0;
  startX = 0;
  startY = 0;
  endX = 0;
  endY = 0;
  startX1 = 0;
  startY1 = 0;
  endX1 = 0;
  endY1 = 0;
  startX2 = 0;
  startY2 = 0;
  endX2 = 0;
  endY2 = 0;
  startX3 = 0;
  startY3 = 0;
  endX3 = 0;
  endY3 = 0;
  globalA2: any;
  globalA3: any;
  globalA4: any;
  globalA5: any;
  a1: any;
  a2: any;
  a3: any;
  a4: any;
  a5: any;
  @ViewChild('native') native: ElementRef;
  @ViewChild('native1') native1: ElementRef;

  changePosition() {
    this.nodes2.forEach((item) => {
      console.log(item.dragPosition)
    })
  }

  drop1(event, index) {
    if (event.dropPoint.x < this.x && event.distance.x < 0) {
      const tog = this.nodes1.includes(index);
      if (!tog) {
        this.nodes1.push(index);
        const CI = this.nodes2.findIndex(item => item === index)
        this.flag = this.flag - 1;
        this.nodes2.splice(CI, 1);

        if (index == this.a1) {
          this.a1 = null;
          this.globalCounter = this.globalCounter - 1;
        }
        else if (index == this.a2) {
          this.a2 = null;
          this.globalCounter = this.globalCounter - 1;
        }
        else if (index == this.a3) {
          this.a3 = null;
          this.globalCounter = this.globalCounter - 1;
        }
        else if (index == this.a4) {
          this.a4 = null;
          this.globalCounter = this.globalCounter - 1;
        }
        else if (index == this.a5) {
          this.a5 = null;
          this.globalCounter = this.globalCounter - 1;
        }
      }
    }

    if (event.dropPoint.x > this.x && event.distance.x > 0) {
      const tog = this.nodes2.includes(index);
      if (!tog) {
        this.nodes2.push(index);
        const CI = this.nodes1.findIndex(item => item === index)
        if (this.flag == 0) {
          this.a1 = index;
          this.a1.nextNode = 2;
          this.a1.preNode = null;
          this.flag = this.flag + 1;
          this.nodes1.splice(CI, 1);
          this.globalCounter = 1;
        }
        else if (this.flag == 1) {
          this.a2 = index;
          this.a2.nextNode = 3;
          this.a2.preNode = 1;
          this.flag = this.flag + 1;
          this.nodes1.splice(CI, 1);
          this.globalCounter = 2;
        }
        else if (this.flag == 2) {
          this.a3 = index;
          this.a3.nextNode = 4;
          this.a3.prevNode = 2
          this.flag = this.flag + 1;
          this.nodes1.splice(CI, 1);
          this.globalCounter = 3;
        }
        else if (this.flag == 3) {
          this.a4 = index;
          this.a4.nextNode = 5;
          this.a4.preNode = 3;
          this.flag = this.flag + 1;
          this.nodes1.splice(CI, 1);
          this.globalCounter = 4;
        }
        else {
          this.a5 = index;
          this.a5.nextNode = null;
          this.a5.preNode = 4;
          this.flag = this.flag + 1;
          this.nodes1.splice(CI, 1);
          this.globalCounter = 5;
        }
      }
    }
    if (this.nodes1.length !== 0) {
      if (this.nodes1.length == 2) {

        this.nodes1[0].preNode = null;
        this.nodes1[0].nextNode = 2;

        this.nodes1[1].preNode = 1;
        this.nodes1[1].nextNode = null;
      }
      else {
        this.nodes1[0].preNode = null;
        this.nodes1[this.nodes1.length - 1].nextNode = null;
        for (let index = 0; index < this.nodes1.length; index++) {
          if (index === 0) {
            this.nodes1[index].nextNode = 2;
          }
          else if (index === this.nodes1.length - 1) {
            if (index === 1) {
              this.nodes1[index].preNode = 1;
              this.nodes1[index].nextNode = null;
            } else {
              this.nodes1[index].nextNode = null;
              this.nodes1[index].preNode = this.nodes1.length - 1;
            }
          }
          else {
            this.nodes1[index].preNode = this.nodes1[index - 1].nextNode - 1;
            this.nodes1[index].nextNode = this.nodes1[index - 1].nextNode + 1;
          }
        }
      }
    }
    if (this.nodes2.length !== 0) {
      if (this.nodes2.length == 2) {
        this.nodes2[0].preNode = null;
        this.nodes2[0].nextNode = 2;
        this.nodes2[1].preNode = 1;
        this.nodes2[1].nextNode = null;
      }
      else {
        this.nodes2[0].preNode = null;
        this.nodes2[this.nodes2.length - 1].nextNode = null;
        for (let index = 0; index < this.nodes2.length; index++) {
          if (index === 0) {
            this.nodes2[index].nextNode = 2;
          }
          else if (index === this.nodes2.length - 1) {
            if (index === 1) {
              this.nodes2[index].preNode = 1;
              this.nodes2[index].nextNode = null;
            } else {
              this.nodes2[index].nextNode = null;
              this.nodes2[index].preNode = this.nodes2.length - 1;
            }
          }
          else {
            this.nodes2[index].preNode = this.nodes2[index - 1].nextNode - 1;
            this.nodes2[index].nextNode = this.nodes2[index - 1].nextNode + 1;
          }
        }
      }
    }

  }

  // Array Sorting Function
  Sort() {
    const toArray = Object.values(this.nodes2);
    const sortedByX = [...toArray].sort((a, b) => a.dragPosition.x - b.dragPosition.x)
  }
  ref() {
    location.reload();
  }

  /* Process Functions Start 1 - 2 - 3 -4 */
  start() {
    if (this.a1 != null) {
      this.a1.isRunning = false;
      this.a1.isCompleted = false;
    }
    if (this.a2 != null) {
      this.a2.isRunning = false;
      this.a2.isCompleted = false;
    }
    if (this.a3 != null) {
      this.a3.isRunning = false;
      this.a3.isCompleted = false;
    }
    if (this.a4 != null) {
      this.a4.isRunning = false;
      this.a4.isCompleted = false;
    }
    if (this.a5 != null) {
      this.a5.isRunning = false;
      this.a5.isCompleted = false;
    }
    if (this.a1 != null) {
      this.a1.isRunning = true;
      setTimeout(() => {
        this.a1.isRunning = false;
        this.a1.isCompleted = true;
        this.start1();
      }, 3000);
    }
  }
  start1() {
    if (this.a2 != null) {
      this.a2.isRunning = true;
      setTimeout(() => {
        this.a2.isRunning = false;
        this.a2.isCompleted = true;
        this.start2();
      }, 3000);
    }
  }
  start2() {
    if (this.a3 != null) {
      this.a3.isRunning = true;
      setTimeout(() => {
        this.a3.isRunning = false;
        this.a3.isCompleted = true;
        this.start3();
      }, 3000);
    }
  }
  start3() {
    if (this.a4 != null) {
      this.a4.isRunning = true;
      setTimeout(() => {
        this.a4.isRunning = false;
        this.a4.isCompleted = true;
        this.start4();
      }, 3000);
    }
  }
  start4() {
    if (this.a5 != null) {
      this.a5.isRunning = true;
      setTimeout(() => {
        this.a5.isRunning = false;
        this.a5.isCompleted = true;
      }, 3000);
    }
  }

  // start(currentObject) {
  //   console.log("im called")
  //   this.onNext = false;
  //   currentObject.isRunning = true;
  //   setTimeout(() => {
  //     currentObject.isRunning = false;
  //     currentObject.isCompleted = true;
  //     this.onNext = true;
  //     if (currentObject.nextNode && currentObject.nextNode != null) {
  //       const index = this.nodes2.findIndex(item => item == currentObject)
  //       this.start(this.nodes2[index + 1])
  //     } else {
  //       this.processCompleted = true
  //     }
  //   }, 3000);
  // }

  /* ----- A function to draw arraw by arrow button ----- */
  call() {
    if (this.globalCounter >= 2) {
      setTimeout(() => {
        this.globalA2 = true;
        const startElement = document.querySelector("#start");
        const endElement = document.querySelector("#end");
        const startRect = startElement.getBoundingClientRect();
        const endRect = endElement.getBoundingClientRect();

        this.startX = startRect.right - 25;
        this.startY = startRect.top;

        this.endX = endRect.left;
        this.endY = endRect.top + 25;
      });
    }
    if (this.globalCounter >= 3) {
      setTimeout(() => {
        this.globalA3 = true;
        const startElement1 = document.querySelector("#end");
        const endElement1 = document.querySelector("#end1");
        const startRect1 = startElement1.getBoundingClientRect();
        const endRect1 = endElement1.getBoundingClientRect();

        this.startX1 = startRect1.right - 25;
        this.startY1 = startRect1.top;

        this.endX1 = endRect1.left;
        this.endY1 = endRect1.top + 25;
      })
    }
    if (this.globalCounter >= 4) {
      setTimeout(() => {
        this.globalA4 = true;
        const startElement2 = document.querySelector("#end1");
        const endElement2 = document.querySelector("#end2");
        const startRect2 = startElement2.getBoundingClientRect();
        const endRect2 = endElement2.getBoundingClientRect();

        this.startX2 = startRect2.right - 25;
        this.startY2 = startRect2.top;

        this.endX2 = endRect2.left;
        this.endY2 = endRect2.top + 25;
      });
    }
    if (this.globalCounter >= 5) {
      setTimeout(() => {
        this.globalA5 = true;
        const startElement3 = document.querySelector("#end2");
        const endElement3 = document.querySelector("#end3");
        const startRect3 = startElement3.getBoundingClientRect();
        const endRect3 = endElement3.getBoundingClientRect();

        this.startX3 = startRect3.right - 25;
        this.startY3 = startRect3.top;

        this.endX3 = endRect3.left;
        this.endY3 = endRect3.top + 25;
      });
    }
  }
  ngOnInit(): void { }
  ngAfterViewInit() {
    if (this.native !== undefined) {
      const el = this.native.nativeElement;
      this.x = el.getBoundingClientRect(this.native).right;
    }
    if (this.globalA2 == true) {
      setTimeout(() => {
        const startElement = document.querySelector("#start");
        const endElement = document.querySelector("#end");
        const startRect = startElement.getBoundingClientRect();
        const endRect = endElement.getBoundingClientRect();

        this.startX = startRect.right - 25;
        this.startY = startRect.top;

        this.endX = endRect.left;
        this.endY = endRect.top + 25;
      });
    }
    if (this.globalA3 == true) {
      setTimeout(() => {
        this.globalA3 = true
        const startElement1 = document.querySelector("#end");
        const endElement1 = document.querySelector("#end1");
        const startRect1 = startElement1.getBoundingClientRect();
        const endRect1 = endElement1.getBoundingClientRect();

        this.startX1 = startRect1.right - 25;
        this.startY1 = startRect1.top;

        this.endX1 = endRect1.left;
        this.endY1 = endRect1.top + 25;
      })
    }
    if (this.globalA4 == true) {
      setTimeout(() => {
        const startElement2 = document.querySelector("#end1");
        const endElement2 = document.querySelector("#end2");
        const startRect2 = startElement2.getBoundingClientRect();
        const endRect2 = endElement2.getBoundingClientRect();

        this.startX2 = startRect2.right - 25;
        this.startY2 = startRect2.top;

        this.endX2 = endRect2.left;
        this.endY2 = endRect2.top + 25;
      });
    }
    if (this.globalA5 == true) {
      setTimeout(() => {
        const startElement3 = document.querySelector("#end2");
        const endElement3 = document.querySelector("#end3");
        const startRect3 = startElement3.getBoundingClientRect();
        const endRect3 = endElement3.getBoundingClientRect();

        this.startX3 = startRect3.right - 25;
        this.startY3 = startRect3.top;

        this.endX3 = endRect3.left;
        this.endY3 = endRect3.top + 25;
      });
    }
  }
}
//   printData() {
//     this.nodes.map((item) => {
//       console.log(item.name);
//     })
//   }
//   drop(event: CdkDragDrop<string[]>) {
//     moveItemInArray(this.timePeriods, event.previousIndex, event.currentIndex);
//   }






//   public get connectedDropListsIds(): string[] {
//     // We reverse ids here to respect items nesting hierarchy
//     return this.getIdsRecursive(this.parentItem).reverse();
//   }

//   constructor() {
//     this.parentItem = new Item({ name: 'parent-item' });
//   }

//   public ngOnInit() {
//     this.parentItem.children.push(new Item({
//       name: 'Parent 1',
//       children: [
//         new Item({ name: 'Child 1' }),
//         new Item({ name: 'Child 2' }),
//         new Item({ name: 'Child 3' })
//       ]
//     }));
//     this.parentItem.children.push(new Item({
//       name: 'Parent 2',
//       children: [
//         new Item({ name: 'P Child 1' }),
//         new Item({ name: 'P Child 2' }),
//         new Item({
//           name: 'subItem6', children: [
//             new Item({ name: 'P Child 2-1' })
//           ]
//         })
//       ]
//     }));
//     this.parentItem.children.push(new Item({ name: 'Parent 3' }));
//   }

//   public onDragDrop(event: CdkDragDrop<Item>) {
//     event.container.element.nativeElement.classList.remove('active');
//     if (this.canBeDropped(event)) {
//       const movingItem: Item = event.item.data;
//       event.container.data.children.push(movingItem);
//       event.previousContainer.data.children = event.previousContainer.data.children.filter((child) => child.uId !== movingItem.uId);
//     } else {
//       moveItemInArray(
//         event.container.data.children,
//         event.previousIndex,
//         event.currentIndex
//       );
//     }
//   }

//   private getIdsRecursive(item: Item): string[] {
//     let ids = [item.uId];
//     item.children.forEach((childItem) => { ids = ids.concat(this.getIdsRecursive(childItem)) });
//     return ids;
//   }

//   private canBeDropped(event: CdkDragDrop<Item, Item>): boolean {
//     const movingItem: Item = event.item.data;
//     return event.previousContainer.id !== event.container.id
//       && this.isNotSelfDrop(event)
//       && !this.hasChild(movingItem, event.container.data);
//   }

//   private isNotSelfDrop(event: CdkDragDrop<Item> | CdkDragEnter<Item> | CdkDragExit<Item>): boolean {
//     return event.container.data.uId !== event.item.data.uId;
//   }
//   private hasChild(parentItem: Item, childItem: Item): boolean {
//     const hasChild = parentItem.children.some((item) => item.uId === childItem.uId);
//     return hasChild ? true : parentItem.children.some((item) => this.hasChild(item, childItem));
//   }

// }
