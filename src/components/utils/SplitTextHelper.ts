import SplitType from "split-type";

export interface SplitTextOptions {
  type?: string;
  types?: string;
  linesClass?: string;
  lineClass?: string;
  wordsClass?: string;
  wordClass?: string;
  charsClass?: string;
  charClass?: string;
  tag?: string;
  [key: string]: unknown;
}

export type SplitTextTarget =
  | string
  | HTMLElement
  | ArrayLike<HTMLElement>
  | (HTMLElement | string)[];

export class SplitText {
  private instances: SplitType[] = [];
  public chars: HTMLElement[] = [];
  public words: HTMLElement[] = [];
  public lines: HTMLElement[] = [];
  public isSplit: boolean = false;

  constructor(target: SplitTextTarget, options: SplitTextOptions = {}) {
    this.split(target, options);
  }

  split(target: SplitTextTarget, options: SplitTextOptions = {}): this {
    if (this.isSplit) {
      this.revert();
    }

    let normalizedTarget: SplitTextTarget = target;
    if (Array.isArray(target) && typeof target[0] === "string") {
      normalizedTarget = (target as string[]).join(", ");
    }

    const rawTypes = options.type || options.types || "lines,words,chars";
    const lineClass = options.linesClass || options.lineClass || "split-line";
    const wordClass = options.wordsClass || options.wordClass || "";
    const charClass = options.charsClass || options.charClass || "";

    try {
      const instance = new SplitType(
        normalizedTarget as string | HTMLElement | ArrayLike<HTMLElement>,
        {
        types: rawTypes as "lines" | "words" | "chars",
        lineClass,
        wordClass,
        charClass,
        tagName: options.tag || "span",
      });

      this.instances = [instance];
      this.chars = (instance.chars || []) as HTMLElement[];
      this.words = (instance.words || []) as HTMLElement[];
      this.lines = (instance.lines || []) as HTMLElement[];
      this.isSplit = true;
    } catch (err) {
      console.warn("SplitText initialization error:", err);
    }

    return this;
  }

  revert(): this {
    this.instances.forEach((inst) => {
      try {
        inst.revert();
      } catch {
        // Ignore revert error if element was already removed
      }
    });
    this.instances = [];
    this.chars = [];
    this.words = [];
    this.lines = [];
    this.isSplit = false;
    return this;
  }

  static create(target: SplitTextTarget, options?: SplitTextOptions): SplitText {
    return new SplitText(target, options);
  }

  static register(): boolean {
    return true;
  }
}

export default SplitText;
