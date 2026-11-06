/**
 * audio.js — Cybernetic UI Sound Synthesizer (Web Audio API)
 * Zero external audio files; 100% procedurally synthesized in real time.
 */

class SoundController {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  _init() {
    if (!this.enabled) return false;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        if (!this.ctx) {
          this.ctx = new AudioContextClass();
        }
        if (this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
        return true;
      }
    } catch (e) {
      return false;
    }
    return false;
  }

  playHover() {
    if (!this._init()) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(640, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.04);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.02, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {}
  }

  playClick() {
    if (!this._init()) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.08);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {}
  }

  playImpulse() {
    if (!this._init()) return;
    try {
      const now = this.ctx.currentTime;
      // Dual resonant ping
      [520, 1040].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.03);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.5, now + i * 0.03 + 0.15);

        gain.gain.setValueAtTime(0.001, now + i * 0.03);
        gain.gain.linearRampToValueAtTime(0.05, now + i * 0.03 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.03 + 0.18);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.03);
        osc.stop(now + i * 0.03 + 0.2);
      });
    } catch (e) {}
  }
}

export const soundFx = new SoundController();

