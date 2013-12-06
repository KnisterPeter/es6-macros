'use strict';
var expect = require('expect.js');

describe('class', function() {
    it('should create a class', function() {
        // next 2 cases don't work until this bug is fixed:
        // https://github.com/mozilla/sweet.js/issues/147

        // class FooEmpty {
        // }

        // class FooSimple {
        //     constructor(x, y) {
        //         this.x = x;
        //         this.y = y;
        //     }
        // }

        class FooWithMethod {
            length() {
                var {x, y} = this;
                return x * x + y * y;
            }
        }

        class Foo {
            constructor(x, y) {
                this.x = x;
                this.y = y;
            }

            length() {
                var {x, y} = this;
                return x * x + y * y;
            }

            getX() {
                return this.x;
            }

            getY() {
                return this.y;
            }
        }

        var f = new Foo(1, 2);
        expect(f.x).to.be(1);
    });

    it('should support super', function() {
        class Foo {
            constructor(x) {
                this.fooX = x + 5;
            }

            getX() {
                return this.fooX;
            }
        }

        class Bar extends Foo {
            constructor(x) {
                super(x);
                this.barX = x;
            }

            getX() {
                return this.barX;
            }

            getFooX() {
                return super.getX();
            }
        }

        var b = new Bar(5);
        expect(b.fooX).to.be(10);
        expect(b.barX).to.be(5);
        expect(b.getX()).to.be(5);
        expect(b.getFooX()).to.be(10);
    });
});
