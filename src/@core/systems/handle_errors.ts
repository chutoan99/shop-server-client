import { Response } from 'express'
import createError from 'http-errors'
import STATUS_CODE from '~/@core/contains/statusCode.json'

//? 400: Máy chủ không thể hiểu yêu cầu do cú pháp không hợp lệ.
export const badRequest = (
	err: string | undefined,
	res: Response
): Response => {
	const error = createError.BadRequest(err)
	return res.status(STATUS_CODE.CLIENT.BAD_REQUEST).json({
		err: -1,
		mes: error.message
	})
}

//? 401: Cho dù quy chuẩn HTTP chỉ định “unauthorized” (không có thẩm quyền), nhưng nó có nghĩa phản hồi này là “unauthenticated” (chưa được xác thực). Có nghĩa là, client phải các tự xác thực chính mình để nhận được phản hồi đã yêu cầu.
export const notUnauthorized = (
	err: string | undefined,
	res: Response
): Response => {
	const error = createError.Unauthorized(err)
	return res.status(STATUS_CODE.CLIENT.UNAUTHORIZED).json({
		err: -1,
		mes: error.message
	})
}

//? 402: Code phản hồi này được dành cho những lần sử dụng trong tương lai. Mục đích ban đầu của việc tạo mã này là sử dụng nó cho các hệ thống thanh toán kỹ thuật số, tuy nhiên status code này rất hiếm khi được sử dụng và không tồn tại quy ước tiêu chuẩn nào.
export const notPaymentRequired = (
	err: string | undefined,
	res: Response
): Response => {
	const error = createError.PaymentRequired(err)
	return res.status(STATUS_CODE.CLIENT.PAYMENT_REQUIRED).json({
		err: -1,
		mes: error.message
	})
}

//? 403: Client không có quyền truy cập vào phần nội dung, nghĩa là nó không được phép, vì vậy máy chủ từ chối cung cấp tài nguyên được yêu cầu. Không giống như 401, danh tính của client đã được máy chủ nhận biết.
export const notForbidden = (
	err: string | undefined,
	res: Response
): Response => {
	const error = createError.Forbidden(err)
	return res.status(STATUS_CODE.CLIENT.FORBIDDEN).json({
		err: -1,
		mes: error.message
	})
}

//? 404:
export const notFound = (err: string | undefined, res: Response): Response => {
	const error = createError.NotFound(err)
	return res.status(STATUS_CODE.CLIENT.NOT_FOUND).json({
		err: -1,
		mes: error.message
	})
}

//? 405: Phương thức yêu cầu được máy chủ nhận biết nhưng đã bị vô hiệu hóa và không thể sử dụng được. Ví dụ: 1 API có thể cấm XÓA 1 nguồn tài nguyên. 2 phương thức bắt buộc, GET và HEAD, không bao giờ được vô hiệu hóa và không được trả về code lỗi này.
export const notMethodNotAllowed = (
	err: string | undefined,
	res: Response
): Response => {
	const error = createError.MethodNotAllowed(err)
	return res.status(STATUS_CODE.CLIENT.METHOD_NOT_ALLOWED).json({
		err: -1,
		mes: error.message
	})
}

//? 406: Phản hồi này được gửi khi máy chủ web, sau khi thực hiện server-driven content negotiation, không tìm thấy bất kỳ nội dung nào phù hợp với các tiêu chí do user-agent đưa ra.
export const notNotAcceptable = (res: Response): Response => {
	const error = createError.NotAcceptable()
	return res.status(STATUS_CODE.CLIENT.NOT_ACCEPTABLE).json({
		err: -1,
		mes: error.message
	})
}

//? 407: Code này tương tự như 401 nhưng việc xác thực là cần thiết để được thực hiện bởi proxy.
export const notProxyAuthenticationRequired = (res: Response): Response => {
	const error = createError.ProxyAuthenticationRequired()
	return res.status(STATUS_CODE.CLIENT.PROXY_AUTHENTICATION_REQUIRED).json({
		err: -1,
		mes: error.message
	})
}

//? 408: Phản hồi này được gửi trên 1 kết nối idle bởi 1 số máy chủ, ngay cả khi không có bất kỳ yêu cầu nào trước đó của client. Có nghĩa là máy chủ muốn tắt kết nối không sử dụng này. Phản hồi này được sử dụng nhiều hơn vì 1 số trình duyệt như Chrome, Firefox 27+ hoặc IE9, sử dụng cơ chế  tiền kết nối HTTP để tăng tốc độ lướt web. Cũng lưu ý rằng 1 số máy chủ chỉ tắt kết nối luôn mà không hề gửi thông báo này.
export const notRequestTimeout = (res: Response): Response => {
	const error = createError.RequestTimeout()
	return res.status(STATUS_CODE.CLIENT.REQUEST_TIMEOUT).json({
		err: -1,
		mes: error.message
	})
}

//? 409: Phản hồi này được gửi khi 1 yêu cầu xung đột với trạng thái hiện tại của máy chủ.
export const notConflict = (res: Response): Response => {
	const error = createError.Conflict()
	return res.status(STATUS_CODE.CLIENT.CONFLICT).json({
		err: -1,
		mes: error.message
	})
}

//? 410: Phản hồi này được gửi khi nội dung được yêu cầu đã bị xóa vĩnh viễn khỏi máy chủ, không có địa chỉ chuyển tiếp. Client phải xóa bộ nhớ cache và liên kết của mình tới nguồn tài nguyên. HTTP spectication dự định status code này được sử dụng cho “các dịch vụ khuyến mại, có thời hạn”. Các API không nên bắt buộc phải chỉ ra các tài nguyên đã bị xóa bằng status code này.
export const notGone = (res: Response): Response => {
	const error = createError.Gone()
	return res.status(STATUS_CODE.CLIENT.GONE).json({
		err: -1,
		mes: error.message
	})
}

//? 411: Máy chủ đã từ chối yêu cầu vì trường header Content-Lenghth không được xác định và máy chủ thì yêu cầu chuyện đó.
export const notLengthRequired = (res: Response): Response => {
	const error = createError.LengthRequired()
	return res.status(STATUS_CODE.CLIENT.LENGTH_REQUIRED).json({
		err: -1,
		mes: error.message
	})
}

//? 412: Client đã chỉ ra các điều kiện tiên quyết trong các header của nó mà máy chủ không đáp ứng được.
export const notPreconditionFailed = (res: Response): Response => {
	const error = createError.PreconditionFailed()
	return res.status(STATUS_CODE.CLIENT.PRECONDITION_FAILED).json({
		err: -1,
		mes: error.message
	})
}

//? 413: Thực thể yêu cầu lớn hơn giới hạn do máy chủ xác định, máy chủ có thể đóng kết nối hoặc trả về trường header Retry-After.
export const notPayloadTooLarge = (res: Response): Response => {
	const error = createError.PayloadTooLarge()
	return res.status(STATUS_CODE.CLIENT.PAYLOAD_TOO_LARGE).json({
		err: -1,
		mes: error.message
	})
}

//? 414: URI được yêu cầu bởi client dài hơn mức máy chủ muốn thông dịch.
export const notURITooLong = (res: Response): Response => {
	const error = createError.URITooLong()
	return res.status(STATUS_CODE.CLIENT.URI_TOO_LONG).json({
		err: -1,
		mes: error.message
	})
}

//? 415: Định dạng phương tiện của dữ liệu được yêu cầu không được máy chủ hỗ trợ, do đó máy chủ đang từ chối yêu cầu.
export const notUnsupportedMediaType = (res: Response): Response => {
	const error = createError.UnsupportedMediaType()
	return res.status(STATUS_CODE.CLIENT.UNSUPPORTED_MEDIA_TYPE).json({
		err: -1,
		mes: error.message
	})
}

//? 416: Client yêu cầu một phần của tập tin nhưng máy chủ không thể cung cấp nó. Trước đây được gọi là “Requested Range Not Satisfiable”.
export const notRangeNotSatisfiable = (res: Response): Response => {
	const error = createError.RangeNotSatisfiable()
	return res.status(STATUS_CODE.CLIENT.RANGE_NOT_SATISFIABLE).json({
		err: -1,
		mes: error.message
	})
}

//? 417: Máy chủ không thể đáp ứng các yêu cầu của trường Expect trong header.
export const notExpectationFailed = (res: Response): Response => {
	const error = createError.ExpectationFailed()
	return res.status(STATUS_CODE.CLIENT.EXPECTATION_FAILED).json({
		err: -1,
		mes: error.message
	})
}

//? 500: Một thông báo chung, được đưa ra khi máy chủ gặp phải một trường hợp bất ngờ, message cụ thể không phù hợp.
export const internalServerError = (res: Response): Response => {
	const error = createError.InternalServerError()
	return res.status(STATUS_CODE.SERVER.INTERNAL_SERVER_ERROR).json({
		err: -1,
		mes: error.message
	})
}

//? 501: Máy chủ không công nhận các phương thức yêu cầu hoặc không có khả năng xử lý nó.
export const notImplemented = (err: any, res: Response): Response => {
	const error = createError.NotImplemented(err)
	return res.status(STATUS_CODE.SERVER.NOT_IMPLEMENTED).json({
		err: -1,
		mes: error.message
	})
}

//? 502: Máy chủ đã hoạt động như một gateway hoặc proxy và nhận được một phản hồi không hợp lệ từ máy chủ nguồn.
export const notBadGateway = (err: any, res: Response): Response => {
	const error = createError.BadGateway(err)
	return res.status(STATUS_CODE.SERVER.BAD_GATEWAY).json({
		err: -1,
		mes: error.message
	})
}

//? 503: Máy chủ hiện tại không có sẵn (hiện đang quá tải hoặc bị down để bảo trì). Đây chỉ là trạng thái tạm thời.
export const notServiceUnavailable = (err: any, res: Response): Response => {
	const error = createError.ServiceUnavailable(err)
	return res.status(STATUS_CODE.SERVER.SERVICE_UNAVAILABLE).json({
		err: -1,
		mes: error.message
	})
}

//? 504: Máy chủ đã hoạt động như một gateway hoặc proxy và không nhận được một phản hồi từ máy chủ nguồn.
export const notGatewayTimeout = (err: any, res: Response): Response => {
	const error = createError.GatewayTimeout(err)
	return res.status(STATUS_CODE.SERVER.GATEWAY_TIMEOUT).json({
		err: -1,
		mes: error.message
	})
}

//? 505: Máy chủ không hỗ trợ phiên bản “giao thức HTTP”.
export const notHTTPVersionNotSupported = (
	err: any,
	res: Response
): Response => {
	const error = createError.HTTPVersionNotSupported(err)
	return res.status(STATUS_CODE.SERVER.HTTP_VERSION_NOT_SUPPORTED).json({
		err: -1,
		mes: error.message
	})
}
