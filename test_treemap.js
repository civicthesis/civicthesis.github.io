
const debtData = {
  name: "Global Debt",
  children: [
    { name: "United States", value: 33400, color: "#3B82F6" },
    { name: "China", value: 14000, color: "#EF4444" },
    { name: "Japan", value: 9200, color: "#10B981" },
    { name: "United Kingdom", value: 3500, color: "#F59E0B" },
    { name: "France", value: 3300, color: "#6366F1" },
    { name: "Italy", value: 3000, color: "#EC4899" },
    { name: "India", value: 2900, color: "#8B5CF6" },
    { name: "Germany", value: 2800, color: "#14B8A6" },
    { name: "Canada", value: 2200, color: "#F97316" },
    { name: "Brazil", value: 1800, color: "#06B6D4" },
  ]
};

// Squarified Treemap Algorithm (Copied from Treemap.astro)
function layout(data, x, y, width, height) {
    if (!data.children || data.children.length === 0) return [];
    
    let nodes = [];
    
    // 1. Sort children by value descending
    const children = [...data.children].sort((a, b) => (b.value || 0) - (a.value || 0));
    const totalValue = children.reduce((acc, c) => acc + (c.value || 0), 0);
    
    console.log("Total Value:", totalValue);

    // Normalize values to area
    const totalArea = width * height;
    const items = children.map((c) => ({
        ...c,
        area: (c.value / totalValue) * totalArea,
        value: c.value 
    }));

    let currentRow = [];
    let remainingItems = [...items];
    let containerX = x;
    let containerY = y;
    let containerW = width;
    let containerH = height;

    const worst = (row, sideLength) => {
        if (row.length === 0 || sideLength === 0) return Infinity;
        const totalArea = row.reduce((sum, item) => sum + item.area, 0);
        const rowSide = totalArea / sideLength; 
        
        let maxRatio = 0;
        for (const item of row) {
            const itemLength = item.area / rowSide; 
            const ratio = Math.max(rowSide / itemLength, itemLength / rowSide);
            if (ratio > maxRatio) maxRatio = ratio;
        }
        return maxRatio;
    };

    const layoutRow = (row, startX, startY, sideLength, isHorizontal) => {
        const rowArea = row.reduce((sum, item) => sum + item.area, 0);
        const rowWidth = rowArea / sideLength;
        
        let currentPos = 0;
        row.forEach((item) => {
            const itemLength = item.area / rowWidth;
            if (isHorizontal) {
                // Row is vertical stack, moving horizontally
                // width = rowWidth, height = itemLength
                nodes.push({
                    name: item.name,
                    x: startX,
                    y: startY + currentPos,
                    width: rowWidth,
                    height: itemLength,
                });
                currentPos += itemLength;
            } else {
                // Working on short side = width, we build a row
                // width = itemLength, height = rowWidth
                nodes.push({
                    name: item.name,
                    x: startX + currentPos,
                    y: startY,
                    width: itemLength,
                    height: rowWidth,
                });
                currentPos += itemLength;
            }
        });
    };

    while (remainingItems.length > 0) {
        const sideLength = Math.min(containerW, containerH);
        const isHorizontal = containerW >= containerH;
        const item = remainingItems[0];
        
        if (currentRow.length === 0) {
            currentRow.push(item);
            remainingItems.shift();
        } else {
            const currentWorst = worst(currentRow, sideLength);
            const newRow = [...currentRow, item];
            const newWorst = worst(newRow, sideLength);
            
            if (newWorst <= currentWorst) {
                currentRow.push(item);
                remainingItems.shift();
            } else {
                layoutRow(currentRow, containerX, containerY, sideLength, isHorizontal);
                
                const rowArea = currentRow.reduce((sum, i) => sum + i.area, 0);
                const rowWidth = rowArea / sideLength;
                
                if (!isHorizontal) { 
                    containerY += rowWidth;
                    containerH -= rowWidth;
                } else { 
                    containerX += rowWidth;
                    containerW -= rowWidth;
                }
                currentRow = [];
            }
        }
    }
    
    if (currentRow.length > 0) {
        const sideLength = Math.min(containerW, containerH);
        const isHorizontal = containerW >= containerH;
        layoutRow(currentRow, containerX, containerY, sideLength, isHorizontal);
    }

    return nodes;
}

// Test Run
const result = layout(debtData, 0, 0, 800, 500); // 800x500 container
console.log("Nodes generated:", result.length);
console.log(JSON.stringify(result, null, 2));
