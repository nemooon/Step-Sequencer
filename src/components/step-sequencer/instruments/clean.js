
import BassDrum1 from 'sounds/clean/bd01.wav'
import BassDrum2 from 'sounds/clean/bd02.wav'
import SnareDrum1 from 'sounds/clean/sd01.wav'
import SnareDrum2 from 'sounds/clean/sd02.wav'
import LowTom1 from 'sounds/clean/lt01.wav'
import LowTom2 from 'sounds/clean/lt02.wav'
import MidTom1 from 'sounds/clean/mt01.wav'
import MidTom2 from 'sounds/clean/mt02.wav'
import HiTom1 from 'sounds/clean/ht01.wav'
import HiTom2 from 'sounds/clean/ht02.wav'
import Rim from 'sounds/clean/rs01.wav'
import Clap from 'sounds/clean/cp01.wav'
import ClosedHiHat from 'sounds/clean/hh01.wav'
import OpenHiHat from 'sounds/clean/oh01.wav'
import Crash from 'sounds/clean/cr01.wav'
import Ride from 'sounds/clean/rd01.wav'

export default new Map([
  [1, {label: 'BASS DRUM', sound: BassDrum1}],
  [2, {label: 'BASS DRUM', sound: BassDrum2}],
  [3, {label: 'SNARE DRUM', sound: SnareDrum1}],
  [4, {label: 'SNARE DRUM', sound: SnareDrum2}],
  [5, {label: 'LOW TOM', sound: LowTom1}],
  [6, {label: 'LOW TOM', sound: LowTom2}],
  [7, {label: 'MID TOM', sound: MidTom1}],
  [8, {label: 'MID TOM', sound: MidTom2}],
  [9, {label: 'HI TOM', sound: HiTom1}],
  [10, {label: 'HI TOM', sound: HiTom2}],
  [11, {label: 'RIM', sound: Rim}],
  [12, {label: 'CLAP', sound: Clap}],
  [13, {label: 'CLOSED', sound: ClosedHiHat}],
  [14, {label: 'OPEN CLOSED', sound: OpenHiHat}],
  [15, {label: 'CRASH', sound: Crash}],
  [16, {label: 'RIDE', sound: Ride}],
])
