// Mult.asm
// -----------------------------------------------------------------------------
// Values stored in R0 and R1 (i.e., the two top RAM locations).
// Program computes the product R0*R1 and stores the result in R2.
// We assume (in this program) that R0>=0, R1>=0, and R0*R1<32768.

@R2
M=0
(LOOP)
  @R2
  D=M     // store sum in D, initially zero.
  @R0
  D=D+M   // add R0 and...
  @R2
  M=D     // store updated sum
  @R1
  MD=M-1
  @END
  D;JLE
  @LOOP
  0;JMP
(END)
  @END
  0;JMP   // infinite loop
