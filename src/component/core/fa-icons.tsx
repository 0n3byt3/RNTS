import type {SvgProps} from "react-native-svg";

import AngleLeft from '../../../assets/fontawesome/duotone/angle-left.svg';
import ArrowLeft from '../../../assets/fontawesome/duotone/arrow-left.svg';
import ArrowRight from '../../../assets/fontawesome/duotone/arrow-right.svg';
import ArrowRepeat from '../../../assets/fontawesome/duotone/arrows-repeat.svg';
import ArrowRepeat1 from '../../../assets/fontawesome/duotone/arrows-repeat-1.svg';
import BarcodeRead from '../../../assets/fontawesome/duotone/barcode-read.svg';
import Bells from '../../../assets/fontawesome/duotone/bells.svg';
import BellOn from '../../../assets/fontawesome/duotone/bell-on.svg';
import Car from '../../../assets/fontawesome/duotone/car.svg';
import CarBus from '../../../assets/fontawesome/duotone/car-bus.svg';
import Cars from '../../../assets/fontawesome/duotone/cars.svg';
import Check from '../../../assets/fontawesome/duotone/check.svg';
import Clock from '../../../assets/fontawesome/duotone/clock.svg';
import ClockRotateLeft from '../../../assets/fontawesome/duotone/clock-rotate-left.svg';
import Circle from '../../../assets/fontawesome/duotone/circle.svg';
import CircleExclamation from '../../../assets/fontawesome/duotone/circle-exclamation.svg';
import CircleStop from '../../../assets/fontawesome/duotone/circle-stop.svg';
import EngineWarning from '../../../assets/fontawesome/duotone/engine-warning.svg';
import Gauge from '../../../assets/fontawesome/duotone/gauge.svg';
import GaugeHigh from '../../../assets/fontawesome/duotone/gauge-high.svg';
import GaugeLow from '../../../assets/fontawesome/duotone/gauge-low.svg';
import KeySkeletonLeftRight from '../../../assets/fontawesome/duotone/key-skeleton-left-right.svg';
import MapLocation from '../../../assets/fontawesome/duotone/map-location.svg';
import MessageCode from '../../../assets/fontawesome/duotone/message-code.svg';
import MessageExclamation from '../../../assets/fontawesome/duotone/message-exclamation.svg';
import MoonStars from '../../../assets/fontawesome/duotone/moon-stars.svg';
import PenToSquare from '../../../assets/fontawesome/duotone/pen-to-square.svg';
import Plus from '../../../assets/fontawesome/duotone/plus.svg';
import Right from '../../../assets/fontawesome/duotone/right.svg';
import RightFromBracket from '../../../assets/fontawesome/duotone/right-from-bracket.svg';
import RightToBracket from '../../../assets/fontawesome/duotone/right-to-bracket.svg';
import SimCard from '../../../assets/fontawesome/duotone/sim-card.svg';
import Spinner from '../../../assets/fontawesome/duotone/spinner.svg';
import Square from '../../../assets/fontawesome/duotone/square.svg';
import SquareCheck from '../../../assets/fontawesome/duotone/square-check.svg';
import Text from '../../../assets/fontawesome/duotone/text.svg';
import TrashCan from '../../../assets/fontawesome/duotone/trash-can.svg';
import User from '../../../assets/fontawesome/duotone/user.svg';
import UserGear from '../../../assets/fontawesome/duotone/user-gear.svg';
import UserPlus from '../../../assets/fontawesome/duotone/user-plus.svg';
import Xmark from '../../../assets/fontawesome/duotone/xmark.svg';

export type SvgElement = (props: SvgProps) => JSX.Element;
interface FAIcons {
	[familyName: string]: { [iconName: string]: SvgElement }
}

const Icons: FAIcons = { fad: {} };
//duotone
Icons.fad = {
	angleLeft: AngleLeft,
	arrowLeft: ArrowLeft,
	arrowRight: ArrowRight,
	arrowRepeat: ArrowRepeat,
	arrowRepeat1: ArrowRepeat1,
	barcodeRead: BarcodeRead,
	bells: Bells,
	bellOn: BellOn,
	car: Car,
	carBus: CarBus,
	cars: Cars,
	check: Check,
	clock: Clock,
	clockRotateLeft: ClockRotateLeft,
	circle: Circle,
	circleExclamation: CircleExclamation,
	circleStop: CircleStop,
	engineWarning: EngineWarning,
	gauge: Gauge,
	gaugeHigh: GaugeHigh,
	gaugeLow: GaugeLow,
	keySkeletonLeftRight: KeySkeletonLeftRight,
	mapLocation: MapLocation,
	messageCode: MessageCode,
	messageExclamation: MessageExclamation,
	moonStars: MoonStars,
	penToSquare: PenToSquare,
	plus: Plus,
	right: Right,
	rightFromBracket: RightFromBracket,
	rightToBracket: RightToBracket,
	simCard: SimCard,
	spinner: Spinner,
	square: Square,
	squareCheck: SquareCheck,
	text: Text,
	trashCan: TrashCan,
	user: User,
	userGear: UserGear,
	userPlus: UserPlus,
	xmark: Xmark,
};

export default Icons;
