/* -*- mode:javascript -*-
 * Copyright (c) 2014 Travis Cross <tc@traviscross.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * ----
 *
 * Backtracking solver to calculate how one should tap one's lands in
 * Magic the Gathering to play a particular card.  A land provides a
 * single mana of one or more colors the player can choose; different
 * lands offer a different set of color choices.  A card requires a
 * certain amount of different colors of mana to play.
 *
 * We use backtracking without any optimizations to produce a solution
 * or to return false if no solution is possible.
 */

Array.prototype.removeidx = function(i) {
  var r = this.slice()
  r.splice(i,1)
  return r
}

// number your mana types 0..n
// a land [0,1,2] provides mana of type 0 || 1 || 2
// larr is an array of lands
// carr is the list of mana needed to play, e.g. [1,1,2]
function solve(larr,carr) {
  if (carr.length == 0) return true
  if (larr.length == 0) return false
  for (var l=0; l<larr.length; l++) {
    for (var m=0; m<larr[l].length; m++) {
      for (var c=0; c<carr.length; c++) {
        if (larr[l][m] == carr[c]) {
          if (solve(larr.removeidx(l),carr.removeidx(c))) {
            return true
          }}}}}
  return false
}

function assert(cond,msg) {
  if (!cond)
    throw msg || "assertion failed"
}

function test_solve() {
  assert(solve([[1],[1,2],[1,2,3]],[1,2,3])==true)
  assert(solve([[1],[1,2],[1,2,3]],[1,2,2])==true)
  assert(solve([[1],[1,2],[1,2,3]],[1,1,1])==true)
  assert(solve([[1],[1,2],[1,2,3]],[1,1,2])==true)
  assert(solve([[1],[1,2],[1,2,3]],[1,1,3])==true)
  assert(solve([[1],[1,2],[1,2,3]],[3,1,1])==true)
  assert(solve([[1,2,3],[1,2],[1]],[1,2,3])==true)
  assert(solve([[1],[1,2],[1,2,3]],[1,1,1,1])==false)
  assert(solve([[1],[1,2],[1,2,3]],[1,2,3,1])==false)
  assert(solve([[1],[1,2],[1,2,3]],[1,3,3])==false)
  assert(solve([[1],[1,2],[1,2,3]],[2,2,2])==false)
  assert(solve([[1],[1,2],[1,2,3]],[1,4])==false)
  return true
}
