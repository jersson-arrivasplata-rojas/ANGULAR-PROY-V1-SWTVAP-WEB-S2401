import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-default',
  templateUrl: './table-default.component.html',
  styleUrls: ['./table-default.component.scss']
})
export class TableDefaultComponent implements OnInit {

  @Input() header: {
    item: string;
  }[] = [
      {
        item: '#'
      },
      {
        item: 'First Name'
      },
      {
        item: 'Last Name'
      },
      {
        item: 'Job Title'
      },
      {
        item: 'Favorite Color'
      },
      {
        item: 'Wars or Trek?'
      },
      {
        item: 'Secret Alias'
      },
      {
        item: 'Date of Birth'
      },
      {
        item: 'Dream Vacation City'
      },
      {
        item: 'GPA'
      },
      {
        item: 'Arbitrary Data'
      }
    ];

  @Input() body: ({
    item: number;
  } | {
    item: string;
  })[][]
    = [
      [
        {
          item: 1
        },
        {
          item: 'James'
        },
        {
          item: 'Matman'
        },
        {
          item: 'Chief Sandwich Eater'
        },
        {
          item: 'Lettuce Green'
        },
        {
          item: 'Trek'
        },
        {
          item: 'Digby Green'
        },
        {
          item: 'January 13, 1979'
        },
        {
          item: 'Gotham City'
        },
        {
          item: '3.1'
        },
        {
          item: 'RBX-12'
        }
      ],
      [
        {
          item: 2
        },
        {
          item: 'James'
        },
        {
          item: 'Matman'
        },
        {
          item: 'Chief Sandwich Eater'
        },
        {
          item: 'Lettuce Green'
        },
        {
          item: 'Trek'
        },
        {
          item: 'Digby Green'
        },
        {
          item: 'January 13, 1979'
        },
        {
          item: 'Gotham City'
        },
        {
          item: '3.1'
        },
        {
          item: 'RBX-12'
        }
      ],
      [
        {
          item: 3
        },
        {
          item: 'James'
        },
        {
          item: 'Matman'
        },
        {
          item: 'Chief Sandwich Eater'
        },
        {
          item: 'Lettuce Green'
        },
        {
          item: 'Trek'
        },
        {
          item: 'Digby Green'
        },
        {
          item: 'January 13, 1979'
        },
        {
          item: 'Gotham City'
        },
        {
          item: '3.1'
        },
        {
          item: 'RBX-12'
        }
      ]
    ];

  @Input() table: {
    header: {
      item: string;
    }[];
    body: ({
      item: number;
    } | {
      item: string;
    })[][]
    total: number;
    page: number;
    pagination: number;
    alignPagination: string;
    bottomTable: string;
    color:string;
    //size: number;
  } = {
      header: [
        {
          item: '#'
        },
        {
          item: 'First Name'
        },
        {
          item: 'Last Name'
        },
        {
          item: 'Job Title'
        },
        {
          item: 'Favorite Color'
        },
        {
          item: 'Wars or Trek?'
        },
        {
          item: 'Secret Alias'
        },
        {
          item: 'Date of Birth'
        },
        {
          item: 'Dream Vacation City'
        },
        {
          item: 'GPA'
        },
        {
          item: 'Arbitrary Data'
        }
      ],
      body: [
        [
          {
            item: 1
          },
          {
            item: 'James'
          },
          {
            item: 'Matman'
          },
          {
            item: 'Chief Sandwich Eater'
          },
          {
            item: 'Lettuce Green'
          },
          {
            item: 'Trek'
          },
          {
            item: 'Digby Green'
          },
          {
            item: 'January 13, 1979'
          },
          {
            item: 'Gotham City'
          },
          {
            item: '3.1'
          },
          {
            item: 'RBX-12'
          }
        ],
        [
          {
            item: 2
          },
          {
            item: 'James'
          },
          {
            item: 'Matman'
          },
          {
            item: 'Chief Sandwich Eater'
          },
          {
            item: 'Lettuce Green'
          },
          {
            item: 'Trek'
          },
          {
            item: 'Digby Green'
          },
          {
            item: 'January 13, 1979'
          },
          {
            item: 'Gotham City'
          },
          {
            item: '3.1'
          },
          {
            item: 'RBX-12'
          }
        ],
        [
          {
            item: 3
          },
          {
            item: 'James'
          },
          {
            item: 'Matman'
          },
          {
            item: 'Chief Sandwich Eater'
          },
          {
            item: 'Lettuce Green'
          },
          {
            item: 'Trek'
          },
          {
            item: 'Digby Green'
          },
          {
            item: 'January 13, 1979'
          },
          {
            item: 'Gotham City'
          },
          {
            item: '3.1'
          },
          {
            item: 'RBX-12'
          }
        ],
        [
          {
            item: 4
          },
          {
            item: 'James'
          },
          {
            item: 'Matman'
          },
          {
            item: 'Chief Sandwich Eater'
          },
          {
            item: 'Lettuce Green'
          },
          {
            item: 'Trek'
          },
          {
            item: 'Digby Green'
          },
          {
            item: 'January 13, 1979'
          },
          {
            item: 'Gotham City'
          },
          {
            item: '3.1'
          },
          {
            item: 'RBX-12'
          }
        ],
        [
          {
            item: 5
          },
          {
            item: 'James'
          },
          {
            item: 'Matman'
          },
          {
            item: 'Chief Sandwich Eater'
          },
          {
            item: 'Lettuce Green'
          },
          {
            item: 'Trek'
          },
          {
            item: 'Digby Green'
          },
          {
            item: 'January 13, 1979'
          },
          {
            item: 'Gotham City'
          },
          {
            item: '3.1'
          },
          {
            item: 'RBX-12'
          }
        ],
        [
          {
            item: 6
          },
          {
            item: 'James'
          },
          {
            item: 'Matman'
          },
          {
            item: 'Chief Sandwich Eater'
          },
          {
            item: 'Lettuce Green'
          },
          {
            item: 'Trek'
          },
          {
            item: 'Digby Green'
          },
          {
            item: 'January 13, 1979'
          },
          {
            item: 'Gotham City'
          },
          {
            item: '3.1'
          },
          {
            item: 'RBX-12'
          }
        ],
        [
          {
            item: 7
          },
          {
            item: 'James'
          },
          {
            item: 'Matman'
          },
          {
            item: 'Chief Sandwich Eater'
          },
          {
            item: 'Lettuce Green'
          },
          {
            item: 'Trek'
          },
          {
            item: 'Digby Green'
          },
          {
            item: 'January 13, 1979'
          },
          {
            item: 'Gotham City'
          },
          {
            item: '3.1'
          },
          {
            item: 'RBX-12'
          }
        ],
        [
          {
            item: 8
          },
          {
            item: 'James'
          },
          {
            item: 'Matman'
          },
          {
            item: 'Chief Sandwich Eater'
          },
          {
            item: 'Lettuce Green'
          },
          {
            item: 'Trek'
          },
          {
            item: 'Digby Green'
          },
          {
            item: 'January 13, 1979'
          },
          {
            item: 'Gotham City'
          },
          {
            item: '3.1'
          },
          {
            item: 'RBX-12'
          }
        ],
        [
          {
            item: 9
          },
          {
            item: 'James'
          },
          {
            item: 'Matman'
          },
          {
            item: 'Chief Sandwich Eater'
          },
          {
            item: 'Lettuce Green'
          },
          {
            item: 'Trek'
          },
          {
            item: 'Digby Green'
          },
          {
            item: 'January 13, 1979'
          },
          {
            item: 'Gotham City'
          },
          {
            item: '3.1'
          },
          {
            item: 'RBX-12'
          }
        ],
        [
          {
            item: 10
          },
          {
            item: 'James'
          },
          {
            item: 'Matman'
          },
          {
            item: 'Chief Sandwich Eater'
          },
          {
            item: 'Lettuce Green'
          },
          {
            item: 'Trek'
          },
          {
            item: 'Digby Green'
          },
          {
            item: 'January 13, 1979'
          },
          {
            item: 'Gotham City'
          },
          {
            item: '3.1'
          },
          {
            item: 'RBX-12'
          }
        ]
      ],
      total: 41,
      page: 1,
      pagination: 10,
      alignPagination: 'end',
      bottomTable: 'true',//'false'
      color: 'primary'
    };

  @Input() tableClass: string = '';
  constructor() { }

  ngOnInit(): void {
  }

  /*get size(): number{
    return Math.ceil(this.table.total / this.table.pagination)
  }*/

  getValidation(): boolean {//this.table.header.length ==
    let lenghtHeader = this.table.header.length;
    let flags = false;
    //let lenghtBody =
    if (this.table.body.length > 0) {

      (this.table.body).forEach(element => {
        if (lenghtHeader == element.length) {
          flags = true;
        } else {
          flags = false;
        }
      });
      return flags;
    }
    return flags;
  }

  get lenghtHeader(): number {
    return this.table.header.length;
  }


  getTextFooter(): string {
    return `Mostrando ${this.table.page} - ${this.table.pagination} de ${this.table.total} entradas`;
  }
}
/*,
size: this.size*/
/*if(this.table.header.length == this.table.body[0].length){
  return true;
}*/
