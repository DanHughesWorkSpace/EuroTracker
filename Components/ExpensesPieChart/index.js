export const getPieChartData = (data) => {
    return data.map((item, index) => {
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16)
        console.log("colors", randomColor);
        return {
            key: index,
            value: item,
            svg: { fill: randomColor },
        }
    })
}